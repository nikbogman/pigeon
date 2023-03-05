import { Button, Loader } from "@mantine/core";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import EventCard from "../../components/Cards/EventCard";
import PageLayout from "../../components/Layouts/PageLayout";
import useAuthenticated from "../../hooks/useAuthenticated";
import { api } from "../../utils/api";
export default function EventsPage() {
    const { status } = useAuthenticated();

    const query = api.event.getAllIncludingAttendeesCount.useQuery(undefined, {
        enabled: status === "authenticated"
    });
    return <>
        <PageLayout>
            <main className="my-14 px-2">
                {query.isLoading ?
                    <div className="p-10 pt-60 flex items-center justify-center h-full">
                        <Loader color="gray" size="xl" />
                    </div>
                    :
                    (
                        query.data ? query.data.map((el, index) => <Link href={`/events/${el.id}`} key={index}>
                            <EventCard event={el} />
                        </Link>) :
                            <h1 className="p-10 text-center text-gray-500 font-medium">
                                You have no events to manage. Press the button down to create one.
                            </h1>
                    )
                }
            </main>
            <div className="w-full fixed z-10 inset-x-0 bottom-1 group">
                <Link href={'/events/create'}>
                    <div className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mx-1">
                        <div className="rounded-lg flex items-center justify-center bg-white w-full transition-all ease-in duration-75 group-hover:bg-opacity-0">
                            <FaPlus className="h-5 w-5 my-2 group-hover:text-white" />
                        </div>
                    </div>
                </Link>
            </div>
        </PageLayout>
    </>
}
