import { BRANDS } from "../../lib/consts.ts";
import type { Insight } from "../../schemas/insight.ts";
import type { FormEvent } from "react";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps & {
  onAdd?(insight: Insight): void;
};

export const AddInsight = ({ onAdd, ...modalProps }: AddInsightProps) => {
  const addInsight = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const response = await fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: Number(form.get("brand")),
        text: form.get("text"),
      }),
    });

    if (!response.ok) throw new Error("Unable to add insight");

    const result = await response.json();
    onAdd?.({ ...result, createdAt: new Date(result.createdAt) });
    formElement.reset();
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          <select className={styles["field-input"]} name="brand">
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            name="text"
            required
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
