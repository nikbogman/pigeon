import { ActionIcon } from "@mantine/core";
import { FaEdit } from "react-icons/fa";

const EditButton: React.FC<{
    size?: number,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    variant?: string
}> = ({ onClick, size, variant }) => <ActionIcon
    color="gray"
    variant={variant || "light"}
    onClick={onClick}
    size={size}
>
    <FaEdit />
</ActionIcon>

export default EditButton;