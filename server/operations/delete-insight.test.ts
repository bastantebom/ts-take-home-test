import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting an insight from the database", () => {
  describe("specified insight not in the DB", () => {
    withDB((fixture) => {
      let result: Insight | undefined;

      beforeAll(() => {
        result = deleteInsight({ ...fixture, id: 1 });
      });

      it("returns nothing", () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe("insight is in the DB", () => {
    withDB((fixture) => {
      const insight: Insight = {
        id: 1,
        brand: 2,
        createdAt: new Date("2026-08-17T00:00:00.000Z"),
        text: "An insightful observation",
      };

      let result: Insight | undefined;

      beforeAll(() => {
        fixture.insights.insert([{
          brand: insight.brand,
          createdAt: insight.createdAt.toISOString(),
          text: insight.text,
        }]);
        result = deleteInsight({ ...fixture, id: insight.id });
      });

      it("returns the deleted insight", () => {
        expect(result).toEqual(insight);
      });

      it("removes the insight from the database", () => {
        expect(fixture.insights.selectAll()).toEqual([]);
      });
    });
  });
});
