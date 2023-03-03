import SelectContacts from "../../../components/Modals/Contact/Select";
import { api } from "../../../utils/api";
import { useForm, FormProvider } from "../../../context/SelectContactContext";
import { TextInput } from "@mantine/core";
import useAuthenticated from "../../../hooks/useAuthenticated";

export default function CreateEventPage() {
    const { status } = useAuthenticated();

    const contacts = api.contact.getAll.useQuery(undefined, {
        enabled: status === "authenticated"
    }).data;

    const mutation = api.event.create.useMutation();

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
            <TextInput
                label="Name"
                placeholder="John Doe"
                required={true}
                size="lg"
                withAsterisk
                {...form.getInputProps('title')}
            />
            <TextInput
                label="Email"
                placeholder="johndoe@mail.com"
                required={true}
                size="lg"
                withAsterisk
                my="xl"
                {...form.getInputProps('description')}
            />
            <button type="submit">Submit</button>
        </form>
    </FormProvider>
}