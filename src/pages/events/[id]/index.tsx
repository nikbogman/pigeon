import type { GetServerSideProps } from "next";
import PageLayout from "../../../components/Layouts/PageLayout";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import { getServerAuthSession } from "../../../server/auth";
import ssgHelpers from "../../../utils/ssgHelpers";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    if (!session) return {
        redirect: {
            destination: '/auth/signIn',
            permanent: false,
        }
    }
    const trpcContext = await createInnerTRPCContext({ session });
    const trpcHelper = ssgHelpers(trpcContext);
    try {
        const events = await trpcHelper.event.getByIdIncludingAttendees.fetch(ctx.params!.id as string);
        return {
            props: { events }
        }
    } catch (error) {
        return { notFound: true }
    }

}

export default function EventPage() {
    return <>
        {/* head */}
        <PageLayout>
            {/* main */}
            <main>

            </main>
        </PageLayout>
    </>
}
