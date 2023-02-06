import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { MdOutlineQrCode2, MdLink } from "react-icons/md";
import Image from "next/image";
type TProps = {
    name: string;
    dataUrl: string;
}

export default function QrModal({ dataUrl, name }: TProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [_, copy] = useCopyToClipboard();

    return <>
        <Button
            color="light"
            onClick={() => setOpen(true)}>
            <FaEye />
        </Button>
        <Modal
            show={open}
            size="xl"
            popup={true}
            style={{ height: '100vh' }}
            onClose={() => setOpen(false)}
        >
            <Modal.Header />
            <Modal.Body className="flex flex-col items-center pt-10">
                <Image alt="qr" src={dataUrl} className="w-full" width={200} height={200} />
                <h1 className="font-bold text-xl mt-5">{name}</h1>
                <Button color="gray" className="w-full mt-5 mb-2" onClick={() => copy(dataUrl)}>
                    <MdOutlineQrCode2 className="mr-5" />Copy QR</Button>
                <Button gradientDuoTone="cyanToBlue" className="w-full" onClick={() => copy('https://react.org')}>
                    <MdLink className="mr-5" />Copy link</Button>
            </Modal.Body>
        </Modal>
    </>
}
