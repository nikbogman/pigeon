import { Paper, Flex, Group, Avatar, Text } from "@mantine/core";
import { Contact } from "@prisma/client";
import EditContactModal from "../Modals/Contact/EditContactModal";
import RemoveContactModal from "../Modals/Contact/RemoveContactModal";

const ContactCard: React.FC<{
    contact: Contact;
}> = ({ contact }) => <Paper shadow="md" radius="md" p="sm" my="sm">
    <Flex justify="space-between">
        <Group>
            <Avatar size={50} color="blue" />
            <div>
                <Text>{contact.name}</Text>
                <Text size="xs" color="dimmed">{contact.email}</Text>
            </div>
        </Group>
        <Group spacing="xs">
            <EditContactModal contact={contact} />
            <RemoveContactModal id={contact.id} />
        </Group>
    </Flex>
</Paper >
export default ContactCard;