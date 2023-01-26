import { Table } from "flowbite-react";
import { FaDownload } from "react-icons/fa";
import QRCode from 'qrcode';

export default function () {

    const handleClick = async () => {
        const buff = await QRCode.toString('https://reactjs.org/');
        const file = new Blob([buff], { type: "image/svg+xml" });
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "pigeonQr-" + Date.now() + ".svg";
        document.body.appendChild(element);
        element.click();
    }

    return <Table.Cell onClick={handleClick}>
        <FaDownload />
    </Table.Cell>
}   