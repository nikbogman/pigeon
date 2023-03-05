import { Paper, Flex, Text, Center, Group } from "@mantine/core";
import { Event } from "@prisma/client";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdCalendarToday, MdGroup } from "react-icons/md";

type Props = {
    event: Event & {
        _count: {
            attendees: number;
        };
    }
}

const EventCard: React.FC<Props> = (props) => {
    return <Paper shadow="md" radius="md" p="lg" my="sm">
        <Flex justify="space-between">
            <div>
                <Text>{props.event.title}</Text>
                <Group spacing="lg">
                    <Group spacing={6} mt={4}>
                        <MdCalendarToday style={{ color: "#868e96" }} />
                        <Text size="sm" color="dimmed">{props.event.date.toLocaleDateString()}</Text>
                    </Group>
                    <Group spacing={6} mt={4}>
                        <MdGroup style={{ color: "#868e96" }} />
                        <Text size="sm" color="dimmed">{props.event._count.attendees.toString()}</Text>
                    </Group>
                </Group>
            </div>
            <Center>
                <HiOutlineArrowRight />
            </Center>
        </Flex>
    </Paper >
}

export default EventCard;