import { IInference } from "@/pages/experiment/chat/index.page";
import styles from "./Inference.module.scss";
import cx from "classnames";

export const Inference = ({ inference }: { inference: IInference }) => {
  return (
    <div className={cx(styles.inference)}>
      <div className={cx(styles.prompt)}>
        <div className={cx(styles.inferenceContent)}>
          <div className={cx(styles.profile)}>
            {inference.profile && <img src={inference.profile?.avatarUrl} />}
          </div>
          <div className={cx(styles.promptBody)}>{inference.prompt}</div>
        </div>
      </div>
      <div className={cx(styles.response)}>
        <div className={cx(styles.inferenceContent)}>
          <div className={cx(styles.profile)}></div>
          <pre className={cx(styles.promptBody)}>{inference.response}</pre>
        </div>
      </div>
    </div>
  );
};
