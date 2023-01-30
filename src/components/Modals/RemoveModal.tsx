import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';
import { api } from "../../utils/api";

export default function () {
    const router = useRouter();
    const [trigger, setTrigger] = useState<boolean>(false)
    const mutation = api.invitation.deleteById.useMutation();

    return <>
        <button
            onClick={() => setTrigger(true)}
            className="bg-red-500 flex text-white font-bold p-2.5 aspect-square rounded-lg h-min border border-transparent"
        ><FaTrash className="h-4 w-4" /></button>

        <Modal
            show={trigger}
            size="xl"
            popup={true}
            style={{ height: '100vh' }}
            onClose={() => setTrigger(false)}
        >
            <Modal.Header></Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <FaExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this event?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            style={{ background: '#F05252' }}
                            onClick={() => {
                                setTrigger(false);
                                mutation.mutate(router.query.id! as string);
                                router.push('/');
                            }}
                        >Yes, I'm sure</Button>
                        <Button
                            color="gray"
                            onClick={() => { setTrigger(false) }}
                        >No, cancel</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}