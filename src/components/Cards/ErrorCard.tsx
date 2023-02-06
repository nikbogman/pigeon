import { Alert } from "flowbite-react";
import { ReactNode } from "react";
import { HiInformationCircle } from "react-icons/hi";

export default function ErrorCards(props: { className: string; children: ReactNode }) {
    return <Alert
        className={props.className}
        color="failure"
        icon={HiInformationCircle}
    >{props.children}</Alert>
}