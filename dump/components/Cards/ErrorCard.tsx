import { Alert } from "flowbite-react";
import { ReactNode } from "react";
import { FaExclamationCircle } from "react-icons/fa";

const ErrorCard: React.FC<{ className?: string; children: ReactNode; }> = (props) => <Alert
    className={props.className}
    color="failure"
    icon={FaExclamationCircle}
>{props.children}</Alert>

export default ErrorCard;