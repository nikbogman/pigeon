import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import InvitationCard from "../components/Cards/InvitationCard";
import Link from "next/link";
import Layout from "../components/Layout";
import { Button } from "flowbite-react";

const Home: NextPage = () => {

  const invitations = api.invitation.getMine.useQuery();

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
