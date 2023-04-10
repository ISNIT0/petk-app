import styles from "./LeftNav.module.scss";
import cx from "classnames";
import LabsIcon from "public/icons/labs.svg";
import QuestionsIcon from "public/icons/questions.svg";
import QueuesIcon from "public/icons/queues.svg";
import LogoIcon from "public/icons/logo.svg";
import NoteIcon from "public/icons/note.svg";
import AddonIcon from "public/icons/addon.svg";
import CodeIcon from "public/icons/code.svg";
import BuildsIcon from "public/icons/builds.svg";
import DocumentIcon from "public/icons/document.svg";
import BulletListIcon from "public/icons/bullet-list.svg";
import MarketplaceIcon from "public/icons/marketplace.svg";
import PremiumIcon from "public/icons/premium.svg";
import TestSessionIcon from "public/icons/test-session.svg";
import LikeIcon from "public/icons/like.svg";
import ErrorIcon from "public/icons/error.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import { Todo } from "../Todo/Todo";

type NavStructure = {
  path: string;
  icon: any;
  label: string;
  subStructure?: NavStructure;
  todo?: boolean;
}[];

const navStructure: NavStructure = [
  {
    path: "/experiment",
    label: "Experiment & Build",
    icon: <LabsIcon />,
    subStructure: [
      { path: "/chat", icon: <QuestionsIcon />, label: "Chat" },
      { path: "/instruction", icon: <QueuesIcon />, label: "Instruction" },
      { path: "/api", icon: <CodeIcon />, label: "APIs" },
    ],
  },
  {
    path: "/prompts",
    label: "Prompt Templates",
    icon: <NoteIcon />,
    subStructure: [
      { path: "/chat", icon: <QuestionsIcon />, label: "Chat" },
      { path: "/instruction", icon: <QueuesIcon />, label: "Instruction" },
      { path: "/tests", icon: <TestSessionIcon />, label: "Tests", todo: true },
      { path: "/tools", icon: <BuildsIcon />, label: "Tools", todo: true },
      {
        path: "/enrichment",
        icon: <DocumentIcon />,
        label: "Enrichment",
        todo: true,
      },
      { path: "/api", icon: <CodeIcon />, label: "APIs", todo: true },
    ],
  },
  {
    path: "/models",
    label: "Models",
    icon: <AddonIcon />,
    subStructure: [
      { path: "/chat", icon: <QuestionsIcon />, label: "Chat" },
      { path: "/instruction", icon: <QueuesIcon />, label: "Instruction" },
      {
        path: "/marketplace",
        icon: <MarketplaceIcon />,
        label: "Marketplace",
      },
      {
        path: "/fine-tuning",
        icon: <PremiumIcon />,
        label: "Fine-Tuning",
        todo: true,
      },
      { path: "/api", icon: <CodeIcon />, label: "APIs", todo: true },
    ],
  },
  {
    path: "/audit",
    label: "Audit",
    icon: <BulletListIcon />,
    subStructure: [
      {
        path: "/chat",
        icon: <QuestionsIcon />,
        label: "Chat",
        todo: true,
      },
      {
        path: "/instruction",
        icon: <QueuesIcon />,
        label: "Instruction",
        todo: true,
      },
      {
        path: "/api",
        icon: <CodeIcon />,
        label: "API Logs",
        todo: true,
      },
      {
        path: "/api",
        icon: <LikeIcon />,
        label: "RLHF",
        todo: true,
      },
      {
        path: "/warnings",
        icon: <ErrorIcon />,
        label: "Warnings",
        todo: true,
      },
    ],
  },
];

export const LeftNav = () => {
  const router = useRouter();
  const { pathname } = router;

  const pageBasePath = "/" + pathname.split("/")[1];
  const pageNavStructure = navStructure.find(
    ({ path }) => path === pageBasePath
  );

  return (
    <nav className={cx(styles.nav)}>
      <section className={cx(styles.primaryNav)}>
        <div className={cx(styles.logo)}>
          <Link href="/">
            <LogoIcon />
          </Link>
        </div>
        <div className={cx(styles.topLinks)}>
          {Object.values(navStructure).map(({ path, icon }) => {
            const isActive = pathname.startsWith(path);

            return (
              <Link
                href={path}
                key={path}
                className={cx(styles.primaryNavLink, {
                  [styles.active]: isActive,
                })}
              >
                {icon}
              </Link>
            );
          })}
        </div>
      </section>
      {pageNavStructure && (
        <section className={cx(styles.pageNav)}>
          <div className={cx(styles.pageNavHeader)}>
            <h1>{pageNavStructure.label}</h1>
          </div>
          <ul className={cx(styles.pageNavLinks)}>
            {pageNavStructure.subStructure?.map(
              ({ path, label, icon, todo }) => {
                const isActive = pathname.startsWith(`${pageBasePath}${path}`);
                return (
                  <li key={path}>
                    <Link
                      href={pageBasePath + path}
                      className={cx({ [styles.active]: isActive })}
                    >
                      {icon}
                      {label}
                      <div style={{ float: "right" }}>{todo && <Todo />}</div>
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
          <div className={cx(styles.navShadow)}></div>
        </section>
      )}
    </nav>
  );
};
