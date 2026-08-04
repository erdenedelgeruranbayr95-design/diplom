import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Loading, Skeleton, Empty, ErrorState } from "./States";

describe("Loading", () => {
  it("renders the default label with an accessible status role", () => {
    render(<Loading />);
    expect(screen.getByRole("status")).toHaveTextContent("Ачааллаж байна…");
  });

  it("renders a custom label", () => {
    render(<Loading label="Түр хүлээнэ үү…" />);
    expect(screen.getByRole("status")).toHaveTextContent("Түр хүлээнэ үү…");
  });
});

describe("Skeleton", () => {
  it("renders `rows` placeholder rows for the default row variant", () => {
    const { container } = render(<Skeleton rows={3} />);
    expect(container.querySelectorAll(".skel-row")).toHaveLength(3);
  });

  it("renders `rows` placeholder cards for the card variant", () => {
    const { container } = render(<Skeleton variant="card" rows={5} />);
    expect(container.querySelectorAll(".skel-card")).toHaveLength(5);
  });

  it("renders a single inline placeholder for the text variant", () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.querySelectorAll(".skel-text")).toHaveLength(1);
  });
});

describe("Empty", () => {
  it("renders the default title", () => {
    render(<Empty />);
    expect(screen.getByText("Хоосон байна")).toBeInTheDocument();
  });

  it("renders a custom title and hint", () => {
    render(<Empty title="Илэрц олдсонгүй" hint="Өөр түлхүүр үг оролдоно уу" />);
    expect(screen.getByText("Илэрц олдсонгүй")).toBeInTheDocument();
    expect(screen.getByText("Өөр түлхүүр үг оролдоно уу")).toBeInTheDocument();
  });

  it("renders the provided action node", () => {
    render(<Empty action={<button>Дахин ачаалах</button>} />);
    expect(screen.getByRole("button", { name: "Дахин ачаалах" })).toBeInTheDocument();
  });
});

describe("ErrorState", () => {
  it("renders with an alert role and the default title", () => {
    render(<ErrorState />);
    expect(screen.getByRole("alert")).toHaveTextContent("Алдаа гарлаа");
  });

  it("renders a retry button and calls onRetry when clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);

    await user.click(screen.getByRole("button", { name: "Дахин оролдох" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("does not render a retry button when onRetry is not provided", () => {
    render(<ErrorState />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
