import { Flex, Modal, Group, Button, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { FaExclamationCircle } from "react-icons/fa";
import { useContextValue } from "../../../context/TRPCRefetchContext";
import { api } from "../../../utils/api";
import TrashButton from "../../Buttons/Action/TrashButton";

const RemoveAttendeesModal: React.FC<{ id: string }> = props => {
    const { refetch } = useContextValue();
    const [isToggled, toggle] = useToggle();
    const mutation = api.attendee.removeById.useMutation({
        onSuccess: async () => refetch().then(() => toggle()),
    });

    return <>
        <Flex justify="end"><TrashButton size={35} onClick={() => toggle()} /></Flex>
        <Modal
            centered
            opened={isToggled}
            onClose={() => toggle()}
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
                    Are you sure you want to remove this attendee?
                </Text >
            </Flex>

            <Group grow spacing="xs" mt="xl">
                <Button
                    loading={mutation.isLoading}
                    variant="filled"
                    color="red"
                    onClick={() => mutation.mutate(props.id)}
                >Yes, sure</Button>
                <Button
                    variant="default"
                    onClick={() => toggle()}
                >No, cancel</Button>
            </Group>
        </Modal>
    </>
}

export default RemoveAttendeesModal;