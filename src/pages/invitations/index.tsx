import { Invitation } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import InvitationCard from "../../components/Cards/InvitationCard";
import Layout from "../../components/Layout";
import { api } from "../../utils/api";
import restrict from "../../utils/restrict";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    return await restrict(ctx);
}

export default function () {
    const invitations = api.invitation.getMine.useQuery();
    return (
        <>
            <Head>
                <title>Pigeon Home</title>
            </Head>
            <Layout>
                <main className="mt-20 mb-16 px-2">
                    {invitations.data?.length ? invitations.data.map((el: Invitation & { _count: { guests: number; } }, i: number) => (
                        <Link href={`/invitations/${el.id}`} key={i}>
                            <InvitationCard
                                title={el.title} description={el.description} date={el.date} guestCount={el._count.guests} />
                        </Link>
                    )) : <h1 className="text-center text-gray-500 font-medium p-10">You have no invitations created. Press the button to do so.</h1>}
                </main>
            </Layout>
        </>
    );
}
