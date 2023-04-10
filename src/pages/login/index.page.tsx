import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormGroup } from "components/Form/FormGroup";
import { Input } from "components/Form/Input";
import { Label } from "components/Form/Label";
import { api } from "@/lib/http";
import styles from "./login.module.css";
import { useUser } from "@/lib/useUser";

const Login: NextPage = ({}) => {
  const { user, refetch } = useUser();
  const router = useRouter();
  const queryEmail = router.query.email
    ? [router.query.email].flat().join("")
    : undefined;
  const queryCode = router.query.code as undefined | string;
  const [email, setEmail] = useState<string>();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (queryEmail && queryCode) {
      (async () => {
        const orgId = "unknown";
        const ret = (await api
          .url(`/auth/${orgId}/login`)
          .post({ email: queryEmail, code: queryCode })
          .json()) as { access_token: string };

        localStorage["alphaiota:jwt"] = ret.access_token;

        refetch();
        router.push("/profile");
      })();
    }
  }, [queryEmail, queryCode, router, refetch]);

  if (user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>You are already logged in</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Doubtful.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${styles.loginMain}`}>
        <h1 className={styles.title}>
          You&apos;re about to make history.
          <br />
          <small style={{ fontSize: "60%" }}>
            But first, you&apos;ve got to Login / Signup...
          </small>
        </h1>

        <section>
          <form
            action="#"
            onSubmit={async (ev) => {
              ev.preventDefault();
              try {
                setIsPending(true);
                const formData = new FormData(ev.target as HTMLFormElement);
                const code = formData.get("code")?.toString();
                const formEmail = formData.get("email")?.toString() || email;
                const orgId = "unknown";

                if (code) {
                  const ret = (await api
                    .url(`/auth/${orgId}/login`)
                    .post({ email: formEmail, code })
                    .json()) as { access_token: string };

                  localStorage["alphaiota:jwt"] = ret.access_token;

                  router.push("/");
                } else if (formEmail) {
                  await api
                    .url(`/auth/${orgId}/login`)
                    .post({ email: formEmail, code: "code" })
                    .json();
                  setEmail(formEmail);
                }
              } finally {
                setIsPending(false);
              }
            }}
          >
            {!email ? (
              <FormGroup>
                <Label label="Email Address" name="email" />
                <Input
                  key="email"
                  name="email"
                  onChange={() => {}}
                  placeholder="joe@bloggs.com"
                  disabled={false}
                  defaultValue=""
                />
                <br />
                <button
                  type="submit"
                  disabled={isPending}
                  className={styles.button}
                >
                  Send Code
                </button>
              </FormGroup>
            ) : (
              <FormGroup>
                <Label label="Code" name="code" />
                <Input
                  key="code"
                  name="code"
                  onChange={() => {}}
                  placeholder="· · · · · ·"
                  disabled={false}
                  defaultValue=""
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className={styles.button}
                >
                  Sign in
                </button>
              </FormGroup>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;
