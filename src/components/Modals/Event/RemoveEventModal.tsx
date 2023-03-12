import { Modal, Flex, Group, Button, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { FaExclamationCircle } from "react-icons/fa";
import { useContextValue } from "../../../context/TRPCRefetchContext";
import { api } from "../../../utils/api";
import TrashButton from "../../Buttons/Action/TrashButton";

const RemoveEventModal: React.FC<{
    id: string,
}> = props => {
    const { refetch } = useContextValue();
    const [isToggled, toggle] = useToggle();
    const mutation = api.event.removeById.useMutation({
        onSuccess: async () => refetch().then(() => toggle()),
    });

    return <>
        <TrashButton size={35} onClick={() => toggle()} />
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
                    Are you sure you want to remove this event?
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

export default RemoveEventModal;