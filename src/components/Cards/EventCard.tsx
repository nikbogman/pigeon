import { Paper, Flex, Group, Text, Box, Title, Center } from "@mantine/core";
import { IconType } from "react-icons";

type ChildProp = { children: React.ReactNode }

const Heading: React.FC<{
    title: string,
    rightButton: React.ReactNode
} & ChildProp> = props => <Flex justify="space-between">
    <Box>
        <Title order={3}>{props.title}</Title>
        <Group spacing="lg" mt={4}>
            {props.children}
        </Group>
    </Box>
    <Center>
        {props.rightButton}
    </Center>
</Flex>

const SubHeading: React.FC<{ icon: IconType, label: string }> = props => <Group spacing={6}>
    <props.icon style={{ color: "#868e96" }} />
    <Text color="dimmed">{props.label}</Text>
</Group>

type SubComponents = {
    Heading: typeof Heading,
    SubHeading: typeof SubHeading,
}

const EventCard: React.FC<ChildProp> & SubComponents = props => <Paper shadow="md" radius="md" p="lg" >
    {props.children}
</Paper >

EventCard.Heading = Heading;
EventCard.SubHeading = SubHeading;

export default EventCard;