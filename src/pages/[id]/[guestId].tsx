import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { notFound } from "next/navigation";

export default function () {
    const { query } = useRouter();
    const guestId = query.guestId! as string;
    const guest = api.invitation.getAsGuest.useQuery({
        guestId,
        invitationId: query.id! as string
    });
    const mutation = api.invitation.changeAttendance.useMutation();

    return <>
        <main className="flex h-screen justify-center items-center flex-col">
            <h1>{guest.data?.invitation.title}</h1>
            <h1>{guest.data?.name}</h1>
        </main>
    </>
}

