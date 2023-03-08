import { useRouter } from "next/router";
import PageLayout from "../../components/Layouts/PageLayout";
import useAuthenticated from "../../hooks/useAuthenticated";
import { api } from "../../utils/api";
import Error from "next/error";
import LoadingScreen from "../../components/LoadingScreen";
import { Paper, Flex, Group, Center, Text, Table, Title, Chip, Container, Input, TextInput, Button } from "@mantine/core";
import { MdCalendarToday, MdGroup, MdSearch } from "react-icons/md";
import TrashButton from "../../components/Buttons/Action/TrashButton";
import StatusBadge from "../../components/StatusBadge";
import { Status } from "@prisma/client";
import { useState } from "react";

import { RxCross2 } from "react-icons/rx"
import EditButton from "../../components/Buttons/Action/EditButton";
// make QR code not unique for attendee but for event
// add remove attendee
// add edit attendees

export default function EventPage() {
    const { status } = useAuthenticated();
    const router = useRouter();
    const id = router.query.eventId as string;
    const [filter, setFilter] = useState<Status | 'ALL'>('ALL');
    const [filterName, setFilterName] = useState<string>('');

    const query = api.event.getByIdIncludingAttendees.useQuery(id, {
        enabled: status === "authenticated" && !!id,
        retry: false
    });


    // extract to hook
    if (query.isError && query.error) return <Error
        statusCode={query.error.data?.httpStatus || 505}
        title={query.error.message}
    />

    const attendees = (() => {
        if (!query.data) return [];
        if (filterName) {
            if (filter === 'ALL')
                return query.data.attendees.filter(a => a.name.includes(filterName));
            return query.data.attendees.filter(a => a.status === filter && a.name.includes(filterName))
        }
        if (filter === 'ALL')
            return query.data.attendees;
        return query.data.attendees.filter(a => a.status === filter)
    })()

    if (query.isLoading) return <LoadingScreen />;


    return <>
        <PageLayout>
            <main className="my-14 px-2">
                {query.data && <>
                    <Paper shadow="md" radius="md" p="lg" my="sm" >
                        <Flex justify="space-between">
                            <div>
                                <Title order={3}>{query.data.title}</Title>
                                <Group spacing={6} mt={4}>
                                    <MdCalendarToday style={{ color: "#868e96" }} />
                                    <Text color="dimmed">{query.data.date.toLocaleDateString()}</Text>
                                </Group>
                            </div>
                            <Center>
                                <TrashButton size={50} />
                            </Center>
                        </Flex>
                        <Text mt="md">{query.data.description}</Text>
                    </Paper >
                    <Container my="lg">
                        <Flex my="md" justify="space-between">
                            <Group spacing={12}>
                                <Text c="dimmed">Filtered: </Text>
                                <Group spacing={6}>
                                    <Text fw={500}>{attendees.length}</Text>
                                    <MdGroup />
                                </Group>
                            </Group>
                            <Center>
                                <EditButton size={50} variant="outline" />
                            </Center>
                        </Flex>
                        <Center>
                            <Chip.Group multiple={false} value={filter} onChange={v => setFilter(v as Status | 'ALL')}>
                                <Chip value="ALL">All</Chip>
                                {Object.values(Status).map((status, index) => <Chip
                                    key={index}
                                    color={['green', 'red', 'orange', 'gray'][index]}
                                    value={status}>
                                    {status.charAt(0) + status.slice(1).toLowerCase()}
                                </Chip>
                                )}
                            </Chip.Group>
                        </Center>
                        <TextInput
                            value={filterName}
                            onChange={e => setFilterName(e.target.value)}
                            mt="lg"
                            icon={<MdSearch />}
                            rightSection={filterName && (
                                <RxCross2
                                    size={18}
                                    style={{
                                        display: 'block',
                                        opacity: 0.3,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setFilterName('')}
                                />)}
                            placeholder="Search for attendee"
                        />
                    </Container>
                    {/* edit */}
                    <Container>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{attendees.map(attendee => (
                                <tr key={attendee.email}>
                                    <td>{attendee.name}</td>
                                    <td><StatusBadge status={attendee.status} /></td>
                                    <td><Flex justify="end"><TrashButton size={35} /></Flex></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Container>
                </>
                }
            </main>
        </PageLayout>
    </>
}
