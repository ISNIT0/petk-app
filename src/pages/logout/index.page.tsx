import type { NextPage } from "next";
import { ironConfig } from "../api/_utils/ironConfig";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "@/lib/useUser";

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  req.session.destroy();
  return { props: {} };
}, ironConfig);

const LogOut: NextPage = () => {
  if (typeof window !== "undefined") {
    delete localStorage["alphaiota:jwt"];
    window.location.href = "/";
  }
  return <></>;
};

export default LogOut;
