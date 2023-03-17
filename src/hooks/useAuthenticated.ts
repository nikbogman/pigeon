import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuthenticated() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.status === "unauthenticated") router.push('/auth/signIn')
    }, [session.status])

    return session;
}