import styles from "./PageHeader.module.scss";
import Link from "next/link";
import { useState } from "react";

export const PageHeader = ({
  title,
  subTitle,
  actionLabel,
  actionHref,
  actionDisabled,
  actionFn,
}: {
  title: string | JSX.Element;
  subTitle?: string | JSX.Element;
  actionLabel?: string | JSX.Element;
  actionHref?: string;
  actionDisabled?: boolean;
  actionFn?: () => void;
}) => {
  const [actionStatus, setActionStatus] = useState("succeeded");

  return (
    <div className={styles.pageHeader}>
      <h1>
        {title}
        {subTitle ? (
          <>
            <br />
            <small>{subTitle}</small>
          </>
        ) : null}
      </h1>
      {actionLabel ? (
        <div>
          {actionHref ? (
            <Link href={actionHref} className={"button"}>
              {actionLabel}
            </Link>
          ) : actionFn ? (
            <button
              disabled={actionDisabled || actionStatus === "pending"}
              className={styles.pageAction}
              onClick={async () => {
                setActionStatus("pending");
                try {
                  await actionFn();
                } finally {
                  setActionStatus("succeeded");
                }
              }}
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
