import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { api } from "../utils/api";

export default function () {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false)
    const mutation = api.invitation.deleteById.useMutation();

    return <>
        <button
            onClick={() => setOpen(true)}
            className="bg-red-500 flex text-white font-bold p-0.5 aspect-square rounded-lg h-min border border-transparent">
            <FaTrash className="h-4 w-4 m-2" />
        </button>
        <Modal
            show={open}
            size="xl"
            popup={true}
            className="modal"
            onClose={() => setOpen(false)}
        >
            <Modal.Body className="pt-12 mt-52">
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this event?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            className="bg-gradient-to-r from-red-500 to-red-500"
                            onClick={() => {
                                setOpen(false);
                                mutation.mutate(router.query.id! as string);
                                router.push('/');
                            }}
                        >
                            Yes, I'm sure
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}