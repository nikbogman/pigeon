import { ActionIcon } from "@mantine/core";
import { FaTrash } from "react-icons/fa";

const TrashButton: React.FC<{
    size?: number,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}> = ({ onClick, size }) => <ActionIcon
    color="red"
    variant="light"
    onClick={onClick}
    size={size}
>
    <FaTrash />
</ActionIcon>

export default TrashButton;