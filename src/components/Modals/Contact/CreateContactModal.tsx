import { FaPlus } from "react-icons/fa";
import { Modal, Button, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from '@mantine/form';
import { api } from "../../../utils/api";
// import useToggle from "../../../hooks/useToggle";
import { useContextValue } from "../../../context/TRPCRefetchContext";
import { z } from "zod";
import { useToggle } from "@mantine/hooks";

const CreateContactModal: React.FC = () => {
    const { refetch } = useContextValue();
    const [isToggled, toggle] = useToggle();

    const mutation = api.contact.add.useMutation({
        onSuccess: async () => refetch().then(() => toggle()).then(form.reset)
    });

    const form = useForm({
        validate: zodResolver(
            z.object({
                name: z.string()
                    .min(5, { message: "Name should have at least 5 letters" }),
                email: z.string()
                    .email({ message: "Valid email shoudl be provided" })
            })
        ),
        initialValues: {
            name: "",
            email: ""
        } as {
            name: string;
            email: string;
        }
    });

    const handleClose = () => {
        toggle();
        form.reset();
    };

    const handleSubmit = form.onSubmit(data => mutation.mutate(data));

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
            opened={isToggled}
            title={<Title order={3}>Add person to contacts</Title>}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Name"
                    placeholder="John Doe"
                    required={true}
                    withAsterisk
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email"
                    placeholder="johndoe@mail.com"
                    required={true}
                    withAsterisk
                    my="xl"
                    {...form.getInputProps('email')}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="outline"
                    color="dark"
                    loading={mutation.isLoading}
                >
                    Add Contact
                </Button>
            </form>
        </Modal>
    </>
}

export default CreateContactModal;
