import { ActionIcon, ScrollArea, Badge, Box, Group, rem, TextInput, Text, Avatar, Checkbox, Flex, Paper, SimpleGrid, Button, Input, Container, Center } from "@mantine/core";
import router from "next/router";
import { useState, useRef } from "react";
import { FaArrowDown, FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { api } from "../../utils/api";
import AlertError from "../Alerts/AlertError";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

// refetch after mutation
const SelectContactsInput: React.FC<{
    value: string[];
    onChange: (index: number, id: string) => void;
    error?: React.ReactNode
}> = props => {
    const query = api.contact.getAll.useQuery();
    const [filter, setFilter] = useState<string>('');

    if (!query.data || query.data.length <= 0)
        return <AlertError title="Bummer!">
            You have no contacts to add as attendees. You need to go back and add some.
            <Button
                leftIcon={<FaArrowLeft />}
                mt="sm"
                variant="outline"
                color="red"
                fullWidth
                onClick={() => router.push('/contacts')}
            >Click here to do so</Button>
        </AlertError>

    return <>
        <Center mb="sm"><SlArrowUp color="#D3D3D3" /></Center>
        <Paper withBorder p={2}>
            <ScrollArea h={400} >
                <SimpleGrid>
                    {query.data.filter(contact => {
                        const name = contact.name.trim().toLowerCase();
                        const filterName = filter.trim().toLowerCase();
                        return name.includes(filterName);
                    }).map((contact, key) => {
                        const index = props.value.indexOf(contact.id);
                        const handleChange = () => props.onChange(index, contact.id);
                        return <Box px="sm" py={2}
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
                                    <Box>
                                        <Text>{contact.name}</Text>
                                        <Text size="xs" color="dimmed">{contact.email}</Text>
                                    </Box>
                                </Group>
                            </Flex>
                        </Box >
                    })}
                </SimpleGrid>
            </ScrollArea>
        </Paper >
        <Center mt="sm"><SlArrowDown color="#D3D3D3" /></Center>
        <Box mt="md">
            <TextInput
                value={filter}
                onChange={e => setFilter(e.target.value)}
                icon={<MdSearch />}
                rightSection={filter && (
                    <RxCross2
                        size={18}
                        style={{
                            display: 'block',
                            opacity: 0.3,
                            cursor: 'pointer',
                        }}
                        onClick={() => setFilter('')}
                    />)}
                placeholder="Search for contact"
            />
            <Input.Wrapper
                label="Your attendees"
                error={props.error}
                withAsterisk
                my="md"
            >
                <Group spacing={2}>{
                    query.data.filter(contact => props.value.includes(contact.id)).map((selected, key) =>
                        <Badge variant="light" mx={3} key={key}>{selected.name}</Badge>
                    )}</Group>
            </Input.Wrapper>
        </Box>
    </>
}

export default SelectContactsInput;