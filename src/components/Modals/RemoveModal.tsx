import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';
import useToggle from "../../hooks/useToggle";
import { api } from "../../utils/api";
import TrashButton from "../Buttons/TrashButton";

export default function RemoveModal() {
    const router = useRouter();
    const [isToggled, toggle] = useToggle();
    const mutation = api.invitation.removeById.useMutation();

    return <>
        <TrashButton onClick={toggle} />
        <Modal
            show={isToggled}
            size="xl"
            popup={true}
            style={{ height: "100vh" }}
            onClose={toggle}
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
                            style={{ background: "#F05252" }}
                            onClick={async () => {
                                toggle();
                                mutation.mutate(router.query.id as string);
                                await router.push("/");
                            }}
                        >Yes, I am sure</Button>
                        <Button
                            color="gray"
                            onClick={toggle}
                        >No, cancel</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}