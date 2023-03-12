import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuthenticated() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") router.push('/auth/signIn')
    }, [status])

    return { status }
}