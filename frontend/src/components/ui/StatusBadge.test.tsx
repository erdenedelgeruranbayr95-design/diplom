import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders the given label", () => {
    render(<StatusBadge label="ADMIN" tone="aqua" />);
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
  });

  it("does not render a dot indicator by default", () => {
    const { container } = render(<StatusBadge label="ADMIN" tone="aqua" />);
    expect(container.querySelectorAll("span")).toHaveLength(1);
  });

  it("renders a hidden dot indicator when dot is true", () => {
    const { container } = render(<StatusBadge label="PRO" tone="warm" dot />);
    const dot = container.querySelector("span[aria-hidden='true']");
    expect(dot).not.toBeNull();
  });

  it("applies the tone-specific class for each tone", () => {
    const { container: aqua } = render(<StatusBadge label="a" tone="aqua" />);
    expect(aqua.firstChild).toHaveClass("text-aqua");

    const { container: rose } = render(<StatusBadge label="b" tone="rose" />);
    expect(rose.firstChild).toHaveClass("text-rose");
  });

  it("merges a custom className with the base classes", () => {
    const { container } = render(<StatusBadge label="c" tone="faint" className="custom-x" />);
    expect(container.firstChild).toHaveClass("custom-x");
    expect(container.firstChild).toHaveClass("text-dim");
  });
});
