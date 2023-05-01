import { IInference } from "@/pages/experiment/chat/index.page";
import styles from "./Inference.module.scss";
import cx from "classnames";
import { useRequestLazy } from "@/lib/useRequestLazy";
import { useCallback } from "react";
import { useUser } from "@/lib/useUser";

export const Inference = ({ inference }: { inference: IInference }) => {
  const { user } = useUser();

  const { doRequest: _rateInference } = useRequestLazy(
    `/inference/${inference.id}/ratings`,
    "POST"
  );

  const rateInference = useCallback(
    (rating: -1 | 1) => {
      _rateInference({ rating, context: { email: user?.email } });
    },
    [_rateInference, user?.email]
  );

  const hasRated = !!inference.ratings.find(
    (rating) => rating.context?.email === user?.email
  );

  const profile = inference.toolProfile || inference.profile;
  return (
    <div className={cx(styles.inference)}>
      <div className={cx(styles.prompt)}>
        <div className={cx(styles.inferenceContent)}>
          <div className={cx(styles.profile)}>
            {profile && <img src={profile?.avatarUrl} />}
          </div>
          <div className={cx(styles.promptBody)}>{inference.prompt}</div>
        </div>
      </div>
      <div className={cx(styles.response)}>
        <details className={cx(styles.inferenceContent)}>
          <summary style={{ listStyle: "none" }}>
            <div className={cx(styles.profile)}></div>
            <pre className={cx(styles.promptBody)}>{inference.response}</pre>
            <div className={cx(styles.rlhf)}>
              <button
                className="secondary"
                onClick={() => rateInference(1)}
                disabled={hasRated}
              >
                👍
              </button>
              /
              <button
                className="secondary"
                onClick={() => rateInference(-1)}
                disabled={hasRated}
              >
                👎
              </button>
            </div>
          </summary>
          <pre>{JSON.stringify(inference, null, "\t")}</pre>
        </details>
      </div>
    </div>
  );
};
