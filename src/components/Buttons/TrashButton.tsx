import { Button } from "flowbite-react";
import { FaTrash } from "react-icons/fa";

const TrashButton: React.FC<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}> = ({ onClick }) => <Button
    style={{ background: '#ef4444' }}
    className="aspect-square ml-2"
    onClick={onClick}>
    <FaTrash className="h-5 w-5" />
</Button>

export default TrashButton;