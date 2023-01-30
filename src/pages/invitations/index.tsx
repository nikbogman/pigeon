import { Invitation } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import InvitationCard from "../../components/Cards/InvitationCard";
import Layout from "../../components/Layout";
import { api } from "../../utils/api";

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
                        <Link href={`/invitations/${el.id}`} >
                            <InvitationCard
                                title={el.title} description={el.description} date={el.date} guestCount={el._count.guests} />
                        </Link>
                    )) : <h1>You have no invitations created. Press the button to do so.</h1>}
                </main>
            </Layout>
        </>
    );
}
