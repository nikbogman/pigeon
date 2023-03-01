import { ActionIcon } from "@mantine/core";
import { FaEdit } from "react-icons/fa";

const EditButton: React.FC<{
    size?: number,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}> = ({ onClick, size }) => {
    return <ActionIcon
        color="gray"
        variant="subtle"
        onClick={onClick}
        size={size}
    >
        <FaEdit />
    </ActionIcon>
}
export default EditButton;