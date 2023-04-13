import cx from "classnames";
import styles from "./Tag.module.scss";

export const Tag = ({
  variant,
  content,
}: {
  variant: "yellow" | "blue" | "green" | "purple" | "red";
  content: string | JSX.Element;
}) => {
  return (
    <aside
      className={cx(styles.tag, {
        [styles.yellow]: variant === "yellow",
        [styles.blue]: variant === "blue",
        [styles.green]: variant === "green",
        [styles.purple]: variant === "purple",
        [styles.red]: variant === "red",
      })}
    >
      {content}
    </aside>
  );
};
