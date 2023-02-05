import Head from "next/head";
import Link from "next/link";
import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import InvitationCard from "../../components/Cards/InvitationCard";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { getServerAuthSession } from "../../server/auth";
import { api } from "../../utils/api";
import ssgHelpers from "../../utils/ssgHelpers";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/signIn',
                permanent: false,
            },
        }
    }
    const trpcContext = createInnerTRPCContext({ session });
    const trpcHelper = ssgHelpers(trpcContext);
    await trpcHelper.invitation.getAllWithGuestCount.prefetch();
    return {
        props: {
            trpcState: trpcHelper.dehydrate()
        }
    }
}

export default function InvitationsPage() {
    const { data } = api.invitation.getAllWithGuestCount.useQuery();
    return (
        <>
            <Head>
                <title>Pigeon Home</title>
            </Head>
            <Layout>
                <main className="mt-20 mb-16 px-2">
                    {data?.length ? data.map((el, i) => (
                        <Link href={`/invitations/${el.id}`} key={i}>
                            <InvitationCard
                                title={el.title}
                                description={el.description}
                                date={el.date}
                                guestCount={el._count.guests}
                            />
                        </Link>
                    )) : <h1 className="text-center text-gray-500 font-medium p-10">You have no invitations created. Press the button to do so.</h1>}
                </main>
            </Layout>
        </>
    );
}
