import { Modal, TextInput, Button, Group, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { api } from "../../../utils/api";
import EditButton from "../../Buttons/Action/EditButton";
import { Contact } from "@prisma/client";
import { useContextValue } from "../../../context/TRPCRefetchContext";
import { z } from "zod";
import { useToggle } from "@mantine/hooks";

const EditContactModal: React.FC<{
    contact: Contact;
}> = props => {
    const { refetch } = useContextValue();
    const mutation = api.contact.updateById.useMutation({
        onSuccess: async () => refetch().then(() => toggle()).then(form.reset),
    });

    const [isToggled, toggle] = useToggle();
    const form = useForm({
        validate: zodResolver(
            z.object({
                name: z.string()
                    .min(5, { message: "Name should have at least 5 letters" }),
                email: z.string()
                    .email({ message: "Valid email shoudl be provided" })
            })
        ),
        initialValues: { name: "", email: "" } as {
            name: string;
            email: string;
        },
    });
    const onSubmit = form.onSubmit(data => mutation.mutate({ id: props.contact.id, update: data }));

    return <>
        <EditButton size={50} onClick={() => toggle()} />
        <Modal
            centered
            opened={isToggled}
            title={<Title order={3}>Edit person to contacts</Title>}
            onClose={toggle}
        >
            <form onSubmit={onSubmit}>
                <TextInput
                    label="Name"
                    placeholder={props.contact.name}
                    required={true}
                    withAsterisk
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email"
                    placeholder={props.contact.email}
                    required={true}
                    withAsterisk
                    my="xl"
                    {...form.getInputProps('email')}
                />
                <Group grow>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outline"
                        color="dark"
                        loading={mutation.isLoading}
                    >
                        Edit
                    </Button>
                    <Button
                        fullWidth
                        variant="default"
                        onClick={() => {
                            toggle();
                            form.reset();
                        }}
                    >
                        Cancel
                    </Button>
                </Group>
            </form>
        </Modal>
    </>
}
export default EditContactModal;