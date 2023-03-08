import { api } from "../../utils/api";
import { Button, TextInput, Textarea, Alert, Loader, Center, } from "@mantine/core";
import useAuthenticated from "../../hooks/useAuthenticated";
import { DateTimePicker } from "@mantine/dates";
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import MultiSelectContacts from "../../components/MutiSelectContacts";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { z } from 'zod';

const schema = z.object({
    title: z.string()
        .min(2, { message: 'Name should have at least 2 letters' })
        .max(20, { message: 'Name should have maximum 20 letters' }),
    description: z.string()
        .min(8, { message: 'Description should have at least 2 letters' }),
    date: z.date()
        .min(new Date(), { message: 'Date should be after today' }),
    attendeeIds: z.string().array().nonempty({ message: 'At least one attendee has to be added' })
});
type FormValues = {
    title: string;
    description: string;
    attendeeIds: string[];
    date: Date | undefined
}

// change to modal

export default function CreateEventPage() {
    const { status } = useAuthenticated();
    const router = useRouter();

    const query = api.contact.getAll.useQuery(undefined, {
        enabled: status === "authenticated"
    });

    const mutation = api.event.create.useMutation();

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            title: "",
            description: "",
            attendeeIds: [],
            date: undefined
        } as FormValues
    });
    const onSubmit = form.onSubmit(async (data) => {
        const { attendeeIds, date, ...mutationVariables } = data;
        const attendees: { name: string, email: string }[] = query.data!
            .filter(contact => attendeeIds.includes(contact.id))
        await mutation.mutateAsync({ attendees, date: date!, ...mutationVariables })
        await router.push('/events')
    })

    const ContactInput = () => {
        if (query.data)
            return <MultiSelectContacts
                {...form.getInputProps('attendeeIds')}
                data={query.data.map(c => ({ value: c.id, description: c.email, label: c.name }))}
            />
        return <Alert icon={<FaExclamationCircle />} title="Bummer!" color="red">
            You have contacts to add as attendees. You need to go back and add some.
            <Button
                leftIcon={<FaArrowLeft />}
                mt="sm"
                variant="outline"
                color="red" fullWidth
            >Click here to do so</Button>
        </Alert>
    }

    return <>
        <main style={{ paddingInline: 8, marginTop: 56 }}>
            <form onSubmit={onSubmit}>
                <TextInput
                    label="Title"
                    placeholder="My 10th birthday"
                    size="md"
                    withAsterisk
                    {...form.getInputProps('title')}
                />
                <Textarea
                    label="Description"
                    placeholder="I would like to invite you to..."
                    size="md"
                    withAsterisk
                    my="xl"
                    minRows={4}
                    {...form.getInputProps('description')}
                />
                <DateTimePicker
                    timeInputProps={{ 'aria-label': 'Pick time' }}
                    my="xl"
                    size="md"
                    dropdownType="modal"
                    label="Pick date"
                    placeholder="Pick date"
                    withAsterisk
                    {...form.getInputProps('date')}
                />
                {query.isLoading ? <Center
                    my="xl"
                    mx="auto"
                    h={50}
                >
                    <Loader color="gray" />
                </Center> : <ContactInput />}
                <Button
                    type="submit"
                    fullWidth
                    variant="outline"
                    color="dark"
                >Create</Button>
            </form>
        </main>
    </>
}

