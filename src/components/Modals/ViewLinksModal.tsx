import { Modal, Button } from "flowbite-react";
import { FaEye } from "react-icons/fa";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { MdOutlineQrCode2, MdLink } from "react-icons/md";
import Image from "next/image";
import useToggle from "../../hooks/useToggle";
import { env } from "../../env/client.mjs";
type TProps = {
    name: string;
    url: string;
    dataUrl: string;
}

export default function QrModal({ dataUrl, name, url }: TProps) {
    const [isToggled, toggle]: [boolean, () => void] = useToggle()
    const [_, copy] = useCopyToClipboard();

    return <>
        <Button
            color="light"
            onClick={toggle}>
            <FaEye />
        </Button>
        <Modal
            show={isToggled}
            size="xl"
            popup={true}
            style={{ height: '100vh' }}
            onClose={toggle}
        >
            <Modal.Header />
            <Modal.Body className="flex flex-col items-center pt-10">
                <Image alt="qr" src={dataUrl} className="w-full" width={200} height={200} />
                <h1 className="font-bold text-xl mt-5">{name}</h1>
                <Button color="gray" className="w-full mt-5 mb-2" onClick={() => copy(dataUrl)}>
                    <MdOutlineQrCode2 className="mr-5" />Copy QR</Button>
                <Button gradientDuoTone="cyanToBlue" className="w-full" onClick={() => copy(url)}>
                    <MdLink className="mr-5" />Copy link</Button>
            </Modal.Body>
        </Modal>
    </>
}
