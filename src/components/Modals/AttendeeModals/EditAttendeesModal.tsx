import { Modal, Group, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useToggle } from "@mantine/hooks";
import { useContextValue } from "../../../context/TRPCRefetchContext";
import { api } from "../../../utils/api";
import EditButton from "../../Buttons/Action/EditButton";
import { z } from "zod";
import { Attendee } from "@prisma/client";
import SelectContactsInput from "../../Inputs/SelectContactsInput";

const EditAttendeesModal: React.FC<{ eventId: string, contactIds: string[] }> = props => {
    const { refetch } = useContextValue();
    const [isToggled, toggle] = useToggle();
    const addMutation = api.attendee.add.useMutation();
    const removeMutation = api.attendee.remove.useMutation();

    const form = useForm({
        validate: zodResolver(
            z.object({
                contactIds: z.string().array().nonempty({ message: 'At least one attendee should be left' })
            })
        ),
        initialValues: {
            contactIds: [...props.contactIds]
        } as { contactIds: string[] }
    })

    const handleSubmit = form.onSubmit(async ({ contactIds: formValues }) => {
        // the ones included in the original but not the in the updated are to be removed
        const toRemove = props.contactIds.filter(attendee => !formValues.includes(attendee));
        // the ones included in the updated but not the in the original are to be added
        const toAdd = formValues.filter(attendee => !props.contactIds.includes(attendee));

        // start all remove and add mutations at the same time
        const mutations: Promise<Attendee>[] = [];
        if (toRemove.length > 0) toRemove
            .map(id => mutations.push(
                removeMutation.mutateAsync({
                    contactId: id,
                    eventId: props.eventId
                })
            ))
        if (toAdd.length > 0) toAdd
            .map(id => mutations.push(
                addMutation.mutateAsync({
                    contactId: id,
                    eventId: props.eventId
                })
            ))
        await Promise.all(mutations);

        await refetch();
        toggle();
        form.reset();
    });

    const handleClose = () => {
        toggle();
        form.reset();
    }

    return <>
        <EditButton size={50} variant="outline" onClick={() => toggle()} />
        <Modal
            centered
            opened={isToggled}
            withCloseButton={false}
            yOffset={0}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <SelectContactsInput {...form.getInputProps('contactIds')}
                    onChange={(index, id) => index >= 0 ? form.removeListItem('contactIds', index) : form.insertListItem(`contactIds`, id)}
                />
                <Group noWrap grow>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outline"
                        color="dark"
                    >
                        Edit
                    </Button>
                    <Button
                        fullWidth
                        variant="default"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Group>
            </form>
        </Modal>
    </>
}

export default EditAttendeesModal;