import { FaPlus } from "react-icons/fa";
import { Modal, Button, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { api } from "../../../utils/api";
import useToggle from "../../../hooks/useToggle";
import { useContextValue } from "../../../context/TRPCRefetchContext";
type Data = {
    name: string;
    email: string;
}

const CreateContactModal: React.FC = () => {
    const { refetch } = useContextValue();
    const mutation = api.contact.add.useMutation({
        onSuccess: async () => refetch().then(toggle).then(form.reset)
    });

    const [isToggled, toggle]: [boolean, () => void] = useToggle();
    const form = useForm({
        initialValues: {
            name: "",
            email: ""
        } as Data
    });

    const onSubmit = form.onSubmit(data => mutation.mutate(data));

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
            opened={isToggled}
            title={<h2>Add person to contacts</h2>}
            onClose={toggle}
        >
            <form onSubmit={onSubmit}>
                <TextInput
                    label="Name"
                    placeholder="John Doe"
                    required={true}
                    size="lg"
                    withAsterisk
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email"
                    placeholder="johndoe@mail.com"
                    required={true}
                    size="lg"
                    withAsterisk
                    my="xl"
                    {...form.getInputProps('email')}
                />
                <Button
                    size="lg"
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
