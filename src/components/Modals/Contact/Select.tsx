import { Modal, Button, Checkbox, Flex, Paper, Group, Avatar, Text } from "@mantine/core";
import { Contact } from "@prisma/client";
import useToggle from "../../../hooks/useToggle";
import { useFormContext } from "../../../context/SelectContactContext";

type Props = {
    contacts: Contact[];
}

const SelectContacts: React.FC<Props> = (props) => {
    const form = useFormContext();
    const [isToggled, toggle]: [boolean, () => void] = useToggle();
    return <>
        <Button onClick={toggle}>
            Attendees
        </Button>
        <Modal
            opened={isToggled}
            onClose={toggle}
        >
            {props.contacts.map((contact, key) => {
                const index = form.values.attendeeIds.indexOf(contact.id)
                const handleChange = () => index >= 0 ? form.removeListItem('attendeeIds', index) : form.insertListItem(`attendeeIds`, contact.id)

                return <Paper shadow="md" radius="md" p="sm" my="sm"
                    onClick={handleChange}
                    key={key}
                >
                    <Flex justify="space-between">
                        <Group>
                            <Checkbox
                                checked={index >= 0}
                                onChange={handleChange}
                            />
                            <Avatar size={50} color="blue" />
                            <div>
                                <Text>{contact.name}</Text>
                                <Text size="xs" color="dimmed">{contact.email}</Text>
                            </div>
                        </Group>
                    </Flex>
                </Paper >
            })}
            <Button>Close</Button>
        </Modal>
    </>
}
export default SelectContacts;