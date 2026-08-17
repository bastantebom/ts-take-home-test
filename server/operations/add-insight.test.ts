import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import addInsight from "./add-insight.ts";

describe("adding an insight to the database", () => {
  withDB((fixture) => {
    const insight = {
      brand: 2,
      createdAt: new Date("2026-08-17T00:00:00.000Z"),
      text: "An insightful observation",
    };

    let result: Insight;

    beforeAll(() => {
      result = addInsight({ ...fixture, ...insight });
    });

    it("returns the added insight with its generated id", () => {
      expect(result).toEqual({ id: 1, ...insight });
    });

    it("adds the insight to the database", () => {
      expect(fixture.insights.selectAll()).toEqual([{
        id: 1,
        brand: insight.brand,
        createdAt: insight.createdAt.toISOString(),
        text: insight.text,
      }]);
    });
  });
});
