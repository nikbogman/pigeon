import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function (props: { bolded: string, normal: string }) {
    return <Alert
        className="m-1"
        color="failure"
        icon={HiInformationCircle}
    >
        <span>
            <span className="font-medium">
                {props.bolded}
            </span>
            {' '}{props.normal}
        </span>
    </Alert>
}