import { describe, expect, it } from "vitest";
import { pickCalm, pickPowerful } from "./feel-groups";
import type { PlayerTrack } from "@/types/player";

const track = (id: number, genre: string): PlayerTrack => ({ id, title: "t" + id, genre }) as PlayerTrack;

/* Каталогийн БОДИТ төрлүүд (2026-08-05: Rock 5 · Хип-хоп 4 · Поп 3 · Балад 3 ·
   RnB 2 · Уламжлалт 1 · Акустик 1 · Трэп 1 · Данс 1). Хоёр секц хоосон гарвал
   RailSection нь `null` буцаадаг тул секц огт харагдахгүй — үүнээс сэргийлнэ. */
const catalog = [
  track(1, "Rock"),
  track(2, "Хип-хоп"),
  track(3, "Поп"),
  track(4, "Балад"),
  track(5, "RnB"),
  track(6, "Уламжлалт"),
  track(7, "Акустик"),
  track(8, "Трэп"),
  track(9, "Данс"),
];

describe("feel-groups", () => {
  it("«Хүчтэй дуунууд» нь бас давамгайлсан төрлүүдийг сонгоно", () => {
    const ids = pickPowerful(catalog).map((t) => t.genre);
    expect(ids).toEqual(["Rock", "Хип-хоп", "Трэп", "Данс"]);
  });

  it("«Намуухан» нь бас ба өндөр давтамж хоёул сул төрлүүдийг сонгоно", () => {
    const ids = pickCalm(catalog).map((t) => t.genre);
    expect(ids).toEqual(["Балад", "Уламжлалт", "Акустик"]);
  });

  it("хоёр бүлэг огтлолцохгүй", () => {
    const powerful = new Set(pickPowerful(catalog).map((t) => t.id));
    const calm = pickCalm(catalog).map((t) => t.id);
    expect(calm.some((id) => powerful.has(id))).toBe(false);
  });

  it("бодит каталог дээр хоёр секц хоосон биш", () => {
    expect(pickPowerful(catalog).length).toBeGreaterThan(0);
    expect(pickCalm(catalog).length).toBeGreaterThan(0);
  });

  it("тодорхойгүй төрөл аль ч бүлэгт орохгүй (FEEL_DEFAULT нь дунд зэрэг)", () => {
    const unknown = [track(99, "Мэдэгдэхгүй төрөл")];
    expect(pickPowerful(unknown)).toHaveLength(0);
    expect(pickCalm(unknown)).toHaveLength(0);
  });
});
