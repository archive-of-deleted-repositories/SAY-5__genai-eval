import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import RunDetailPage from "@/app/runs/[id]/page";
import { getRun } from "@/lib/api";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("not found");
  },
}));
vi.mock("@/lib/api", () => ({
  getRun: vi.fn(),
  listRunItems: vi.fn().mockResolvedValue([]),
  getTrends: vi.fn().mockResolvedValue({ points: [], count: 0 }),
}));

describe("run detail route", () => {
  beforeEach(() => {
    vi.mocked(getRun).mockResolvedValue({
      id: 1,
      provider: "fake",
      model: "test-model",
      started_at: "2026-01-01T00:00:00Z",
      finished_at: null,
      status: "complete",
      suite_filter: {},
      summary: { cells: [] },
    });
  });

  it("resolves asynchronous route parameters before fetching the run", async () => {
    render(await RunDetailPage({ params: Promise.resolve({ id: "1" }) }));

    expect(getRun).toHaveBeenCalledWith(1);
    expect(screen.getByRole("heading", { name: /Run #1/ }).textContent).toContain("test-model");
  });
});
