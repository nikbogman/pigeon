import { Alert, Button, TextInput, Textarea, Center, Loader, Modal, Title, SimpleGrid, Group } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { zodResolver, useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { FaExclamationCircle, FaArrowLeft, FaPlus } from "react-icons/fa";
import useAuthenticated from "../../../hooks/useAuthenticated";
import { api } from "../../../utils/api";
import MultiSelectContacts from "../../Inputs/MutiSelectContacts";
import { z } from 'zod';
import useToggle from "../../../hooks/useToggle";
import { useContextValue } from "../../../context/TRPCRefetchContext";

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

const CreateEventModal: React.FC<{}> = () => {
    const { status } = useAuthenticated();
    const { refetch } = useContextValue();
    const query = api.contact.getAll.useQuery(undefined, {
        enabled: status === "authenticated"
    });

    const [isToggled, toggle]: [boolean, () => void] = useToggle();
    const mutation = api.event.create.useMutation({
        onSuccess: async () => refetch().then(toggle)
    });
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
        return mutation.mutate({ attendees, date: date!, ...mutationVariables })
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
        <div className="w-full fixed z-10 inset-x-0 bottom-1 group" onClick={toggle}>
            <div className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mx-1">
                <div className="rounded-lg flex items-center justify-center bg-white w-full transition-all ease-in duration-75 group-hover:bg-opacity-0">
                    <FaPlus className="h-5 w-5 my-2 group-hover:text-white" />
                </div>
            </div>
        </div>
        <Modal
            centered
            fullScreen
            opened={isToggled}
            title={<Title order={3}>Create event and invite people</Title>}
            onClose={toggle}
        >
            <form onSubmit={onSubmit}>
                <SimpleGrid cols={1}>
                    <TextInput
                        label="Title"
                        placeholder="My 10th birthday"
                        withAsterisk
                        {...form.getInputProps('title')}
                    />
                    <Textarea
                        label="Description"
                        placeholder="I would like to invite you to..."
                        withAsterisk
                        minRows={4}
                        {...form.getInputProps('description')}
                    />
                    <DateTimePicker
                        timeInputProps={{ 'aria-label': 'Pick time' }}
                        dropdownType="modal"
                        label="Pick date"
                        placeholder="Pick date"
                        withAsterisk
                        {...form.getInputProps('date')}
                    />
                    <ContactInput />
                    <Group grow spacing="xs">
                        <Button
                            variant="default"
                            onClick={toggle}
                        >Cancel</Button>
                        <Button
                            type="submit"
                            variant="outline"
                            color="dark"
                        >Create</Button>
                    </Group>
                </SimpleGrid>
            </form>
        </Modal>
    </>
}

export default CreateEventModal;