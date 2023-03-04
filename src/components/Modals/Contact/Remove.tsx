import TrashButton from "../../Buttons/Action/TrashButton";
import { Button, Group, Modal, Flex, Text } from "@mantine/core";
import useToggle from "../../../hooks/useToggle";
import { FaExclamationCircle } from "react-icons/fa";
import { api } from "../../../utils/api";
import { useContext } from "react";
import ContactModalContext from "../../../context/ContactModalContext";

const RemoveContactModal: React.FC<{
    id: string,
}> = (props) => {
    const { refetch } = useContext(ContactModalContext);

    const [isToggled, toggle]: [boolean, () => void] = useToggle();
    const mutation = api.contact.removeById.useMutation({
        onSuccess: async () => refetch().then(toggle),
    });
    return <>
        <TrashButton size={50} onClick={toggle} />
        <Modal
            centered
            opened={isToggled}
            onClose={toggle}
        >
            <Flex
                gap="md"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
            >
                <FaExclamationCircle className="mx-auto h-14 w-14 text-gray-400 " />
                <Text fz="lg" c="gray" ta="center">
                    Are you sure you want to remove this contact?
                </Text >
            </Flex>

            <Group grow spacing="xs" mt="xl">
                <Button
                    loading={mutation.isLoading}
                    variant="filled" color="red"
                    onClick={() => mutation.mutate(props.id)}
                >
                    Yes, sure
                </Button>
                <Button
                    variant="default"
                    onClick={toggle}
                >
                    No, cancel
                </Button>
            </Group>
        </Modal>
    </>
}
export default RemoveContactModal;