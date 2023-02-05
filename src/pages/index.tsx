import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "flowbite-react";
export function getServerSideProps() {
  return {
    redirect: {
      destination: '/invitations',
      permanent: false,
    }
  }
}

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
