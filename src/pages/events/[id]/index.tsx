import { useRouter } from "next/router";
import PageLayout from "../../../components/Layouts/PageLayout";
import useAuthenticated from "../../../hooks/useAuthenticated";
import { api } from "../../../utils/api";
import Error from "next/error";
import LoadingScreen from "../../../components/LoadingScreen";
import { Paper, Flex, Group, Center, Text, Table, Badge } from "@mantine/core";
import { MdCalendarToday, MdGroup } from "react-icons/md";
import TrashButton from "../../../components/Buttons/Action/TrashButton";


// make QR code not unique for attendee but for event
// make status banner
// add remove attendee
// add edit attendees
export default function EventPage() {
    const { status } = useAuthenticated();
    const router = useRouter();
    const id = router.query.id as string;

    const query = api.event.getByIdIncludingAttendees.useQuery(id, {
        enabled: status === "authenticated" && !!id,
        retry: false
    });

    // extract to hook
    if (query.isError && query.error) return <Error
        statusCode={query.error.data?.httpStatus || 505}
        title={query.error.message}
    />

    if (query.isLoading) return <LoadingScreen />;
    return <>
        <PageLayout>
            <main className="my-14 px-2">
                {query.data && <><Paper shadow="md" radius="md" p="lg" my="sm">
                    <Flex justify="space-between">
                        <div>
                            <Text size="lg">{query.data.title}</Text>
                            <Group spacing="lg">
                                <Group spacing={6} mt={4}>
                                    <MdCalendarToday style={{ color: "#868e96" }} />
                                    <Text size="sm" color="dimmed">{query.data.date.toLocaleDateString()}</Text>
                                </Group>
                                <Group spacing={6} mt={4}>
                                    <MdGroup style={{ color: "#868e96" }} />
                                    <Text size="sm" color="dimmed">{query.data.attendees.length}</Text>
                                </Group>
                            </Group>
                        </div>
                        <Center>
                            <TrashButton size={50} />
                        </Center>
                    </Flex>
                    <Text mt="lg">{query.data.description}</Text>
                </Paper >
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{query.data.attendees.map(attendee => (
                            <tr key={attendee.email}>
                                <td>{attendee.name}</td>
                                <td><Badge color="orange">{attendee.status}</Badge></td>
                                <td><Flex justify="end">
                                    <TrashButton size={35} />
                                </Flex></td>
                            </tr>))}</tbody>
                    </Table>
                </>}
            </main>
        </PageLayout>
    </>
}
