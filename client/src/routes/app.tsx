import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    fetch(`/api/insights`)
      .then((res) => res.json())
      .then((result) =>
        setInsights(result.map((insight: Insight) => ({
          ...insight,
          createdAt: new Date(insight.createdAt),
        })))
      );
  }, []);

  return (
    <main className={styles.main}>
      <Header
        onAddInsight={(insight) =>
          setInsights((current) => [...current, insight])}
      />
      <Insights className={styles.insights} insights={insights} />
    </main>
  );
};
