import styles from "./List.module.scss";
import Link from "next/link";

export interface IListItem {
  title: string | JSX.Element;
  subTitle?: string | JSX.Element;
  href?: string;
}

export const List = ({ items }: { items: IListItem[] }) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => {
        return (
          <li key={item.href}>
            <Link href={item.href || "#"}>
              {item.title}
              <br />
              <small className={styles.subTitle}>{item.subTitle}</small>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
