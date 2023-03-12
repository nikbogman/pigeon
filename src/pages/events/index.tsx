import { SimpleGrid } from "@mantine/core";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdCalendarToday, MdGroup } from "react-icons/md";
import PageLayout from "../../components/Layouts/PageLayout";
import LoadingScreen from "../../components/LoadingScreen";
import CreateEventModal from "../../components/Modals/Event/CreateEventModal";
import { TRPCRefetchContextProvider } from "../../context/TRPCRefetchContext";
import useAuthenticated from "../../hooks/useAuthenticated";
import { api } from "../../utils/api";
import { Event } from "@prisma/client";
import EventCard from "../../components/Cards/EventCard";

// add turnecate to text!!!!
export default function EventsPage() {
    const { status } = useAuthenticated();

    const query = api.event.getAllIncludingAttendeesCount.useQuery(undefined, {
        enabled: status === "authenticated"
    });

    if (query.isLoading) return <LoadingScreen />;

    const EventCards = ({ events }: {
        events: (Event & { _count: { attendees: number } })[]
    }) => <SimpleGrid cols={1}>
            {events.map((event, index) => <Link href={`/events/${event.id}`} key={index}>
                <EventCard>
                    <EventCard.Heading
                        title={event.title}
                        rightButton={<HiOutlineArrowRight />}
                    >
                        <EventCard.SubHeading
                            icon={MdCalendarToday}
                            label={event.date.toLocaleDateString()}
                        />
                        <EventCard.SubHeading
                            icon={MdGroup}
                            label={event._count.attendees.toString()}
                        />
                    </EventCard.Heading>
                </EventCard>
            </Link>)}
        </SimpleGrid>

    return <>
        <PageLayout>
            <TRPCRefetchContextProvider refetch={query.refetch}>
                <main>
                    {query.data && query.data.length > 0 ? <EventCards events={query.data} /> : <h1 className="p-10 text-center text-gray-500 font-medium">
                        You have no events to manage. Press the button down to create one.
                    </h1>}
                </main>
                <CreateEventModal />
            </TRPCRefetchContextProvider>
        </PageLayout>
    </>
}
