import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import InvitationCard from "../components/InvitationCard";
import Menu from "../components/Layout";
import Link from "next/link";
import { Button } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { Invitation } from "@prisma/client";
import Layout from "../components/Layout";

const Home: NextPage = () => {

  const invitations = api.invitation.getMine.useQuery();

  return (
    <>
      <Head>
        <title>Pigeon Home</title>
      </Head>
      <Layout>
        <main className="mt-20 mb-16 px-2">
          {invitations.data ? invitations.data.map((el, i: number) => (
            <Link href={`/invitations/${el.id}`} >
              <InvitationCard title={el.title} description={el.description} date={el.date} guestCount={el._count.guests} />
            </Link>
          )) : <h1>You have no invitations created. Press the button to do so.</h1>}
        </main>
      </Layout>
    </>
  );
};

export default Home;
