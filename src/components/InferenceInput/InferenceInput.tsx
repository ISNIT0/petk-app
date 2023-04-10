import { IInference } from "@/pages/experiment/chat/index.page";
import styles from "./InferenceInput.module.scss";
import cx from "classnames";
import { useState } from "react";

export const InferenceInput = ({
  onSubmit,
}: {
  onSubmit: (prompt: string) => Promise<void>;
}) => {
  const [status, setStatus] = useState<"pending" | "succeeded" | "errored">(
    "succeeded"
  );

  // TODO: Meta+Enter should submit
  return (
    <form
      className={cx(styles.inputWrapper)}
      onSubmit={async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const formData = new FormData(ev.target as HTMLFormElement);
        const prompt = formData.get("prompt")?.toString() || "";
        setStatus("pending");
        await onSubmit(prompt);
        setStatus("succeeded");
        (ev.target as HTMLFormElement).querySelector("textarea")!.value = "";
      }}
    >
      <textarea
        name="prompt"
        disabled={status === "pending"}
        required
        minLength={5}
      />
      <div className={cx(styles.buttonWrapper)}>
        <button disabled={status === "pending"}>Send</button>
      </div>
    </form>
  );
};
