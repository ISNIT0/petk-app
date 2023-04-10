import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "@/lib/http";
import styles from "./profile.module.css";
import { FormGroup } from "components/Form/FormGroup";
import { Label } from "components/Form/Label";
import { Input } from "components/Form/Input";
import { useUser } from "@/lib/useUser";

const Profile: NextPage = ({}) => {
  const { user, refetch } = useUser();
  console.log(user);
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [generatedAvatar, setGeneratedAvatar] = useState<any>();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch(
      `https://avatars.dicebear.com/api/human/${
        (userName || "avatar") + Date.now()
      }.svg`
    ).then((res) => setGeneratedAvatar(res));
  }, [userName]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Alpha Iota.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tell us about yourself...</h1>

        <section className={styles.wrapper}>
          <form
            action="#"
            onSubmit={async (ev) => {
              ev.preventDefault();
              try {
                setIsPending(true);
                const formData = new FormData(ev.target as HTMLFormElement);
                const name = formData.get("name")?.toString();
                const avatarUrl =
                  formData.get("avatarUrl")?.toString() || generatedAvatar.url;

                await api
                  .url(`/profile/update`)
                  .post({ name, avatarUrl })
                  .json();

                refetch();

                if (!user?.name) {
                  router.push("/");
                }
              } finally {
                setIsPending(false);
              }
            }}
          >
            <br />
            <FormGroup>
              <Label name="name" label="Your name" />
              <Input
                name={"name"}
                placeholder={"Your name..."}
                defaultValue={user?.name}
                onChange={(name) => {
                  setUserName(name);
                }}
                disabled={false}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label
                name="avatarUrl"
                label="A public url to an avatar (optional)"
              />
              <Input
                name={"avatarUrl"}
                placeholder={"A url... or we'll generate an avatar"}
                defaultValue={user?.avatarUrl}
                onChange={() => {}}
                disabled={false}
                type="url"
              />
            </FormGroup>

            <button
              type="submit"
              disabled={isPending}
              className={styles.button}
            >
              Save
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Profile;
