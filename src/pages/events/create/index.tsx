import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import SelectContacts from "../../../components/Modals/Contact/Select";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import { getServerAuthSession } from "../../../server/auth";
import { api } from "../../../utils/api";
import ssgHelpers from "../../../utils/ssgHelpers";
import { useForm, FormProvider, type FormValues } from "../../../context/SelectContactContext";



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
// rework with csr
export default function CreateEventPage() {
    const contacts = api.contact.getAll.useQuery().data;
    const mutation = api.event.create.useMutation();
    const router = useRouter();

    const form = useForm({
        initialValues: {
            title: "",
            date: new Date(),
            description: "",
            attendeeIds: []
        }
    });

    const onSubmit = form.onSubmit(async (data) => {
        console.log(data.attendeeIds)
    })

    return <FormProvider form={form}>
        <form onSubmit={onSubmit}>
            {contacts && <SelectContacts contacts={contacts} />}
            <button type="submit">Submit</button>
        </form>
    </FormProvider>
}