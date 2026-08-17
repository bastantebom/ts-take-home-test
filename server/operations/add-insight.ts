import type { Insight } from "$models/insight.ts";
import type * as insightsTable from "$tables/insights.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & Omit<Insight, "id">;

export default (input: Input): Insight => {
  console.log("Adding insight");

  const [row] = input.db.sql<insightsTable.Row>`
    INSERT INTO insights (brand, createdAt, text)
    VALUES (${input.brand}, ${input.createdAt.toISOString()}, ${input.text})
    RETURNING *
  `;

  const result = { ...row, createdAt: new Date(row.createdAt) };
  console.log("Insight added successfully:", result);
  return result;
};
