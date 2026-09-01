import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders children", () => {
    render(
      <Grid>
        <div>Cell 1</div>
        <div>Cell 2</div>
      </Grid>,
    );

    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 2")).toBeInTheDocument();
  });

  it.each([2, 3, 4, 6, 12] as const)(
    "supports %i desktop columns",
    (columns) => {
      const { container } = render(
        <Grid columns={columns}>
          <div>Cell</div>
        </Grid>,
      );

      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain(`md:grid-cols-${columns}`);
    },
  );

  it("stacks to a single column on mobile", () => {
    const { container } = render(
      <Grid columns={3}>
        <div>Cell</div>
      </Grid>,
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("grid-cols-1");
  });

  it("applies the design system gutter", () => {
    const { container } = render(
      <Grid>
        <div>Cell</div>
      </Grid>,
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("gap-6");
  });

  it("lets className overrides win", () => {
    const { container } = render(
      <Grid className="gap-0">
        <div>Cell</div>
      </Grid>,
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain("gap-0");
    expect(grid.className).not.toContain("gap-6");
  });
});
