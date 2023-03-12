import { Badge } from "@mantine/core";

const colors = {
    'YES': 'green',
    'NO': 'red',
    'MAYBE': 'orange',
    'UNKNOWN': 'gray',
};

const StatusBadge: React.FC<{
    status: 'YES' | 'NO' | 'MAYBE' | 'UNKNOWN'
}> = props => <Badge color={colors[props.status]}>{props.status}</Badge>

export default StatusBadge;