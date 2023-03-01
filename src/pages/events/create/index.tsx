import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import SelectContactModal from "../../../components/Modals/SelectContactsModal";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import { getServerAuthSession } from "../../../server/auth";
import { api } from "../../../utils/api";
import ssgHelpers from "../../../utils/ssgHelpers";

type Data = {
    title: string;
    date: Date;
    description: string;
    attendeeIds: string[];
}

// prefetch all contacts
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
    await trpcHelper.contact.getAll.prefetch();
    return {
        props: {
            trpcState: trpcHelper.dehydrate()
        }
    }
}

export default function CreateEventPage() {
    const contacts = api.contact.getAll.useQuery().data;
    const mutation = api.event.create.useMutation();
    const router = useRouter();

    const methods = useForm({
        defaultValues: {
            title: "",
            date: new Date(),
            description: "",
            attendeeIds: []
        } satisfies Data
    });

    const onSubmit = methods.handleSubmit(async (data) => {
        console.log(data)
    })

    return <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
            {contacts && <SelectContactModal contacts={contacts} />}
            <button type="submit">Submit</button>
        </form>
    </FormProvider>
}