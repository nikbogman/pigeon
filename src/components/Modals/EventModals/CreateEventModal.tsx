import { Button, TextInput, Textarea, Modal, Title, SimpleGrid, Group } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { zodResolver, useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { api } from "../../../utils/api";
import MultiSelectContacts from "../../Inputs/MutiSelectContacts";
import { z } from 'zod';
import { useContextValue } from "../../../context/TRPCRefetchContext";
import { useToggle } from "@mantine/hooks";
import AlertError from "../../Alerts/AlertError";

const CreateEventModal: React.FC = () => {
    const router = useRouter();
    const { refetch } = useContextValue();

    const query = api.contact.getAll.useQuery();

    const [isToggled, toggle] = useToggle();
    const mutation = api.event.create.useMutation({
        onSuccess: async () => refetch().then(() => toggle()).then(form.reset)
    });
    const form = useForm({
        validate: zodResolver(
            z.object({
                title: z.string()
                    .min(5, { message: 'Name should have at least 5 letters' })
                    .max(30, { message: 'Name should have maximum 20 letters' }),
                description: z.string()
                    .min(8, { message: 'Description should have at least 8 letters' }),
                date: z.date()
                    .min(new Date(), { message: 'Date should be after today' }),
                contactIds: z.string().array().nonempty({ message: 'At least one attendee has to be added' })
            })
        ),
        initialValues: {
            title: "",
            description: "",
            contactIds: [],
            date: undefined
        } as {
            title: string;
            description: string;
            contactIds: string[];
            date: Date | undefined
        }
    });

    const handleClose = () => {
        toggle();
        form.reset();
    };

    // handle if query data globaly

    const handleSubmit = form.onSubmit(data => {
        const { contactIds, date, ...mutationVariables } = data;
        const attendees: { name: string, email: string, contactId: string }[] = query.data!
            .filter(contact => contactIds.includes(contact.id)).map(contact => ({ contactId: contact.id, ...contact }))
        return mutation.mutate({ attendees, date: date!, ...mutationVariables })
    })

    const ContactInput = () => {
        if (query.data && query.data.length > 0)
            return <MultiSelectContacts
                {...form.getInputProps('contactIds')}
                data={query.data.map(c => ({ value: c.id, description: c.email, label: c.name }))}
            />
        return <AlertError title="Bummer!">
            You have contacts to add as attendees. You need to go back and add some.
            <Button
                leftIcon={<FaArrowLeft />}
                mt="sm"
                variant="outline"
                color="red"
                fullWidth
                onClick={() => router.push('/contacts')}
            >Click here to do so</Button>
        </AlertError>
    }

    return <>
        <div className="w-full fixed z-10 inset-x-0 bottom-1 group" onClick={() => toggle()}>
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
            <form onSubmit={handleSubmit}>
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
                            onClick={handleClose}
                        >Cancel</Button>
                        <Button
                            type="submit"
                            variant="outline"
                            color="dark"
                            disabled={!query.data || query.data.length <= 0}
                        >Create</Button>
                    </Group>
                </SimpleGrid>
            </form>
        </Modal>
    </>
}

export default CreateEventModal;