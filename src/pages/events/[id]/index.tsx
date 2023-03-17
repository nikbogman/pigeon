import { useRouter } from "next/router";
import { useSetState } from "@mantine/hooks";
import { Flex, Group, Center, Chip, TextInput, Table, Container, Text } from "@mantine/core";
import { MdCalendarToday, MdGroup, MdSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import TrashButton from "../../../components/Buttons/Action/TrashButton";
import EventCard from "../../../components/Cards/EventCard";
import PageLayout from "../../../components/Layouts/PageLayout";
import LoadingScreen from "../../../components/LoadingScreen";
import EditAttendeesModal from "../../../components/Modals/AttendeeModals/EditAttendeesModal";
import RemoveAttendeesModal from "../../../components/Modals/AttendeeModals/RemoveAttendeesModal";
import StatusBadge from "../../../components/StatusBadge";
import { TRPCRefetchContextProvider } from "../../../context/TRPCRefetchContext";
import useAuthenticated from "../../../hooks/useAuthenticated";
import { api } from "../../../utils/api";
import Error from "next/error";
import RemoveEventModal from "../../../components/Modals/EventModals/RemoveEventModal";

type StatusType = 'YES' | 'NO' | 'MAYBE' | 'UNKNOWN';
const StatusList: StatusType[] = ['YES', 'NO', 'MAYBE', 'UNKNOWN'];

export default function EventPage() {
    const { status } = useAuthenticated();
    const { query: { id: eventId } } = useRouter();
    const id = eventId as string;
    const query = api.event.getByIdIncludingAttendees.useQuery(id, {
        enabled: status === "authenticated" && !!id,
        retry: false,
    });

    const [filter, setFilter] = useSetState<{
        collection: StatusType | 'ALL',
        name: string
    }>({
        collection: 'ALL',
        name: ''
    })

    if (query.isError && query.error.data) return <Error
        statusCode={query.error.data.httpStatus || 500}
        title={query.error.message}
    />;
    if (query.isLoading || !query.data) return <LoadingScreen />;



    const filteredAttendees = (attendees => {
        let filtered = attendees;
        if (filter.collection !== 'ALL')
            filtered = query.data!.attendees.filter(attendee => attendee.status === filter.collection);
        if (filter.name)
            filtered = filtered.filter(attendee => {
                const name = attendee.contact.name.trim().toLowerCase();
                const filterName = filter.name.trim().toLowerCase();
                return name.includes(filterName);
            })
        return filtered;
    })(query.data.attendees)

    return <>
        <PageLayout>
            <main>
                <TRPCRefetchContextProvider refetch={query.refetch}>
                    <EventCard>
                        <EventCard.Heading
                            title={query.data.title}
                            rightButton={<RemoveEventModal id={id} />}
                        >
                            <EventCard.SubHeading
                                icon={MdCalendarToday}
                                label={query.data.date.toLocaleDateString()}
                            />
                        </EventCard.Heading>
                        <Text mt="md">{query.data.description}</Text>
                    </EventCard>
                    <Container my="lg">
                        <Flex my="md" justify="space-between">
                            <Group spacing={12}>
                                <Text c="dimmed">Filtered: </Text>
                                <Group spacing={6}>
                                    <Text fw={500}>{filteredAttendees.length}</Text>
                                    <MdGroup />
                                </Group>
                            </Group>
                            <Center>
                                <EditAttendeesModal
                                    eventId={id}
                                    contactIds={query.data.attendees.map(attendee => attendee.contactId)}
                                />
                            </Center>
                        </Flex>
                        <Center>
                            <Chip.Group
                                multiple={false}
                                value={filter.collection}
                                onChange={(collection: StatusType | 'ALL') => setFilter({ collection })}
                            >
                                <Chip value="ALL">All</Chip>
                                {StatusList.map((status, index) => <Chip
                                    key={index}
                                    color={['green', 'red', 'orange', 'gray'][index]}
                                    value={status}>
                                    {status.charAt(0) + status.slice(1).toLowerCase()}
                                </Chip>)}
                            </Chip.Group>
                        </Center>
                        <TextInput
                            value={filter.name}
                            onChange={e => setFilter({ name: e.target.value })}
                            mt="lg"
                            icon={<MdSearch />}
                            rightSection={filter.name && (
                                <RxCross2
                                    size={18}
                                    style={{
                                        display: 'block',
                                        opacity: 0.3,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setFilter({ name: '' })}
                                />)}
                            placeholder="Search for attendee"
                        />
                    </Container>
                    <Container>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{filteredAttendees.map(attendee => (
                                <tr key={attendee.contact.email}>
                                    <td>{attendee.contact.name}</td>
                                    <td><StatusBadge status={attendee.status as StatusType} /></td>
                                    <td><RemoveAttendeesModal eventId={id} contactId={attendee.contactId} /></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Container>
                </TRPCRefetchContextProvider>
            </main>
        </PageLayout>
    </>
}
