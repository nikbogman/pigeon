import { Modal, Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { QRCodeSVG } from 'qrcode.react';

interface IProps {
    url: string;
    name: string;
}

export default function ({ name, url }: IProps) {
    const [open, setOpen] = useState<boolean>(false)

    return <>
        <Table.Cell onClick={() => setOpen(true)}>
            <FaEye />
        </Table.Cell>
        <Modal
            show={open}
            size="xl"
            popup={true}
            className="modal"
            onClose={() => setOpen(false)}
        >
            <Modal.Header />
            <Modal.Body className="flex flex-col items-center pt-10">
                <QRCodeSVG value="https://reactjs.org/" size={256} />
                <h1 className="font-bold text-xl mt-10">{name}</h1>
            </Modal.Body>
        </Modal>
    </>
}
