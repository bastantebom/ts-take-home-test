import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { Insights } from "./insights.tsx";

const TEST_INSIGHTS = [
  {
    id: 1,
    brand: 1,
    createdAt: new Date(),
    text: "Test insight",
  },
  {
    id: 2,
    brand: 2,
    createdAt: new Date(),
    text: "Another test insight",
  },
];

describe("insights", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders", () => {
    const { getByText } = render(<Insights insights={TEST_INSIGHTS} />);
    expect(getByText(TEST_INSIGHTS[0].text)).toBeTruthy();
  });

  it("deletes an insight", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    const onDelete = vi.fn();
    vi.stubGlobal("fetch", fetch);

    const { getByLabelText } = render(
      <Insights insights={TEST_INSIGHTS} onDelete={onDelete} />,
    );
    fireEvent.click(getByLabelText("Delete insight 1"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/insights/1", {
        method: "DELETE",
      });
      expect(onDelete).toHaveBeenCalledWith(1);
    });
  });
});
