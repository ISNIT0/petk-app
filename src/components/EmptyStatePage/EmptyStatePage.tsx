import Link from "next/link";
import { Page } from "../Page/Page";
import style from "./EmptyStatePage.module.scss";
import CraneIcon from "public/crane-construction.svg";

export const EmptyStatePage = ({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string | JSX.Element;
  description: string | JSX.Element;
  actionLabel: string | JSX.Element;
  actionHref: string;
}) => {
  return (
    <Page>
      <div className={style.container}>
        <div className={style.emptyState}>
          <CraneIcon />
          <br />
          <br />
          <h1>{title}</h1>
          <br />
          <p>{description}</p>
          <br />
          <Link className="button" href={actionHref}>
            {actionLabel}
          </Link>
        </div>
      </div>
    </Page>
  );
};
