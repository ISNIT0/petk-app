import Head from "next/head";
import { Inter } from "next/font/google";
import { Page } from "@/components/Page/Page";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader/PageHeader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Alpha Iota</title>
        <meta name="description" content="Prompt Engineering Tool Kit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <>
          <PageHeader
            title="Welcome to Alpha Iota"
            subTitle={
              <>
                <p>
                  There&apos;s quite a lot of functionality buried behind the
                  unfinished pages... I hope you&apos;ll bare with me.
                </p>
                <br />
                <ol style={{ marginLeft: "20px" }}>
                  <li>
                    <Link href="/login">Log In / Sign Up</Link>
                  </li>
                  <li>
                    <Link href="/models/marketplace">
                      Connect to your OpenAI account
                    </Link>
                  </li>
                  <li>
                    <Link href="/models/marketplace">
                      Connect to your OpenAI account
                    </Link>
                  </li>
                  <li>
                    <Link href="/prompts/marketplace">
                      Enable some Instruction Model tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/experiment/instruction">
                      Ask your Instruction Model a question
                    </Link>
                  </li>
                  <li>
                    <Link href="/prompts/instruction">Modify Pre-Prompts</Link>
                  </li>
                </ol>
              </>
            }
          />
        </>
      </Page>
    </>
  );
}
