import { describe, it, expect, vi, beforeEach } from "vitest";

/* Масс байршуулалтын гол зан төлөв: ДАРААЛАН явна, нэг файл унасан ч үлдсэнийг
   үргэлжлүүлнэ, буцаах дараалал нь ФАЙЛЫН дараалалтай тэнцүү. Эдгээр нь цомгийн
   трек дугаарлалт зөв гарахын үндэс тул unit түвшинд бэхлэв. */

const getUploadUrl = vi.fn();
const createSong = vi.fn();
const submitAnalysis = vi.fn();
const analyzeAudioFile = vi.fn();

vi.mock("@/lib/api/client", () => ({
  getUploadUrl: (...a: unknown[]) => getUploadUrl(...a),
  createSong: (...a: unknown[]) => createSong(...a),
  submitAnalysis: (...a: unknown[]) => submitAnalysis(...a),
}));

vi.mock("@/lib/audio/analyze", () => ({
  analyzeAudioFile: (...a: unknown[]) => analyzeAudioFile(...a),
}));

const { titleFromFilename, uploadSongsBatch, uploadCoverImage } = await import("./upload");

function mp3(name: string) {
  return new File([new Uint8Array([1, 2, 3])], name, { type: "audio/mpeg" });
}

const COMMON = { artist: "Батаа", genre: "", license: "ORIGINAL" as const };

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));
  getUploadUrl.mockImplementation((filename: string) =>
    Promise.resolve({ uploadUrl: "https://s3.test/put", key: `songs/${filename}` }),
  );
  createSong.mockImplementation((p: { title: string }) =>
    Promise.resolve({ id: `id-${p.title}`, title: p.title, fileUrl: "https://cdn.test/a.mp3" }),
  );
  analyzeAudioFile.mockResolvedValue({ bpm: 120 });
  submitAnalysis.mockResolvedValue({});
});

describe("titleFromFilename", () => {
  it("өргөтгөлийг хасна", () => {
    expect(titleFromFilename("Салхи.mp3")).toBe("Салхи");
  });

  it("урд талын трек дугаарыг хасна", () => {
    expect(titleFromFilename("03 - Салхи.mp3")).toBe("Салхи");
    expect(titleFromFilename("03. Салхи.flac")).toBe("Салхи");
    expect(titleFromFilename("03_Салхи.wav")).toBe("Салхи");
    expect(titleFromFilename("7) Салхи.ogg")).toBe("Салхи");
  });

  it("дуунд өөрт нь буй тоог хадгална", () => {
    /* «1000 жил» гэдэг нэрийг трек дугаар гэж ойлгож БОЛОХГҮЙ — тусгаарлагч
       тэмдэг байхгүй тул хэвээр үлдэнэ. */
    expect(titleFromFilename("1000 жил.mp3")).toBe("1000 жил");
  });

  it("зөвхөн дугаараас бүрдсэн нэр хоосон болохгүй", () => {
    expect(titleFromFilename("01.mp3")).toBe("01");
  });
});

describe("uploadSongsBatch", () => {
  it("дуунуудыг ФАЙЛЫН дарааллаар буцаана", async () => {
    const res = await uploadSongsBatch([mp3("01 - Нэг.mp3"), mp3("02 - Хоёр.mp3"), mp3("03 - Гурав.mp3")], COMMON);
    expect(res.songs.map((s) => s.title)).toEqual(["Нэг", "Хоёр", "Гурав"]);
    expect(res.failures).toEqual([]);
  });

  it("нэг файл унасан ч үлдсэнийг үргэлжлүүлнэ", async () => {
    createSong.mockImplementation((p: { title: string }) =>
      p.title === "Хоёр"
        ? Promise.reject(new Error("сервер унав"))
        : Promise.resolve({ id: `id-${p.title}`, title: p.title, fileUrl: "https://cdn.test/a.mp3" }),
    );

    const res = await uploadSongsBatch([mp3("Нэг.mp3"), mp3("Хоёр.mp3"), mp3("Гурав.mp3")], COMMON);
    expect(res.songs.map((s) => s.title)).toEqual(["Нэг", "Гурав"]);
    expect(res.failures).toEqual([{ filename: "Хоёр.mp3", error: "сервер унав" }]);
  });

  it("анализ унасан ч дуу нь орсонд тооцогдоно", async () => {
    /* Дуу аль хэдийн санд орсон тул анализын алдаа нь байршуулалтыг
       унагаах ЁСГҮЙ — эс бөгөөс хэрэглэгч дуугаа дахин оруулна. */
    analyzeAudioFile.mockRejectedValue(new Error("decode fail"));
    const res = await uploadSongsBatch([mp3("Нэг.mp3")], COMMON);
    expect(res.songs).toHaveLength(1);
    expect(res.failures).toEqual([]);
  });

  it("ЗЭРЭГ биш дараалан явна", async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    createSong.mockImplementation(async (p: { title: string }) => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((r) => setTimeout(r, 5));
      inFlight--;
      return { id: `id-${p.title}`, title: p.title, fileUrl: "https://cdn.test/a.mp3" };
    });

    await uploadSongsBatch([mp3("a.mp3"), mp3("b.mp3"), mp3("c.mp3")], COMMON);
    expect(maxInFlight).toBe(1);
  });

  it("явцыг файл тус бүрд мэдээлнэ", async () => {
    const seen: string[] = [];
    await uploadSongsBatch([mp3("a.mp3"), mp3("b.mp3")], COMMON, (p) => seen.push(`${p.index}:${p.phase}`));
    expect(seen).toEqual(["0:uploading", "0:analyzing", "0:done", "1:uploading", "1:analyzing", "1:done"]);
  });

  it("унасан файлыг failed гэж мэдээлнэ", async () => {
    createSong.mockRejectedValue(new Error("боломжгүй"));
    const seen: string[] = [];
    await uploadSongsBatch([mp3("a.mp3")], COMMON, (p) => seen.push(p.phase));
    expect(seen).toContain("failed");
  });

  it("хоосон жагсаалт нь сүлжээнд огт хандахгүй", async () => {
    const res = await uploadSongsBatch([], COMMON);
    expect(res).toEqual({ songs: [], failures: [] });
    expect(getUploadUrl).not.toHaveBeenCalled();
  });
});

describe("uploadCoverImage", () => {
  it("kind=cover-ээр presigned URL гуйна", async () => {
    getUploadUrl.mockResolvedValue({ uploadUrl: "https://s3.test/put", key: "covers/a.jpg" });
    const file = new File([new Uint8Array([1])], "a.jpg", { type: "image/png" });

    await expect(uploadCoverImage(file)).resolves.toBe("covers/a.jpg");
    expect(getUploadUrl).toHaveBeenCalledWith("a.jpg", "image/png", "cover");
  });

  it("S3 татгалзвал алдаа шиднэ", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    const file = new File([new Uint8Array([1])], "a.jpg", { type: "image/jpeg" });
    await expect(uploadCoverImage(file)).rejects.toThrow("403");
  });
});
