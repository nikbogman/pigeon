import { Group, Text } from "@mantine/core";
import { Attendee } from "@prisma/client";
import { MdGroup } from "react-icons/md";

const colors = {
    'YES': 'green',
    'NO': 'red',
    'MAYBE': 'orange',
    'UNKNOWN': 'gray',
};

const StatusGroupNumber: React.FC<{
    status: 'YES' | 'NO' | 'MAYBE' | 'UNKNOWN'
    attendees: Attendee[]
}> = (props) => <Group
    spacing={6}
    c={colors[props.status]}>
    <MdGroup />
    <Text>{props.attendees.filter(a => a.status === props.status).length}</Text>
</Group>

export default StatusGroupNumber