import { Modal, TextInput, Button, Group, Title } from "@mantine/core";
import useToggle from "../../../hooks/useToggle";
import { useForm } from "@mantine/form";
import { api } from "../../../utils/api";
import EditButton from "../../Buttons/Action/EditButton";
import { Contact } from "@prisma/client";
import { useContextValue } from "../../../context/TRPCRefetchContext";

type Data = {
    name: string;
    email: string;
}
type Props = {
    contact: Contact;
}

const EditContactModal: React.FC<Props> = (props) => {
    const { refetch } = useContextValue();
    const mutation = api.contact.updateById.useMutation({
        onSuccess: async () => refetch().then(toggle).then(form.reset),
    });

    const [isToggled, toggle]: [boolean, () => void] = useToggle();
    const form = useForm({
        initialValues: { name: "", email: "" } satisfies Data,
    });
    const onSubmit = form.onSubmit(data => mutation.mutate({ id: props.contact.id, update: data }));

    return <>
        <EditButton size={50} onClick={toggle} />
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