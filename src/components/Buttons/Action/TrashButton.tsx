import { ActionIcon } from "@mantine/core";
import { FaTrash } from "react-icons/fa";

const TrashButton: React.FC<{
    size?: number,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}> = ({ onClick, size }) => {
    return <ActionIcon
        color="red"
        variant="subtle"
        onClick={onClick}
        size={size}
    >
        <FaTrash />
    </ActionIcon>
}

export default TrashButton;