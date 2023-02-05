import { Button } from "flowbite-react";
import { FaDownload } from "react-icons/fa";

type IProps = {
    dataUrl: string;
    name: string;
}
export default function QrDownload(props: IProps) {

    const handleClick = () => {
        const element = document.createElement("a");
        element.href = props.dataUrl;
        element.download = `pigeonQr-${props.name}.png`;
        document.body.appendChild(element);
        element.click();
    }

    return <Button
        color="light"
        onClick={handleClick}>
        <FaDownload />
    </Button>
}   