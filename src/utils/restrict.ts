import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
export default async function (context: GetServerSidePropsContext, props: any = {}) {
    const session = await getServerAuthSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signIn',
                permanent: false,
            },
        }
    }

    return { props }
}