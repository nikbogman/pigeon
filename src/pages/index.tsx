import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "flowbite-react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pigeon Home</title>
      </Head>
      <Link href='/invitations'>
        <Button>Click</Button>
      </Link>
    </>
  );
};

export default Home;
