import styles from "./Page.module.scss";

export const Page = ({ children }: { children: JSX.Element }) => {
  return (
    <section className={styles.page}>
      <div className={styles.container}>{children}</div>
    </section>
  );
};
