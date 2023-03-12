import { Alert } from "@mantine/core";
import { FaExclamationCircle } from "react-icons/fa";

const AlertError: React.FC<{
    title: string,
    children: React.ReactNode
}> = props => <Alert
    icon={<FaExclamationCircle size="1rem" />}
    title={props.title}
    color="red"
    radius="xs"
>
    {props.children}
</Alert>

export default AlertError;