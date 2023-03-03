import { Button } from "@mantine/core";
import Link from "next/link";
import PageLayout from "../../components/Layouts/PageLayout";
import useAuthenticated from "../../hooks/useAuthenticated";
import { api } from "../../utils/api";
export default function EventsPage() {
    const { status } = useAuthenticated();

    const { data } = api.contact.getAll.useQuery(undefined, {
        enabled: status === "authenticated"
    });
    return <>
        <PageLayout>
            <main className="my-14 px-2">
                {data?.length ? <div className="grid grid-col-1 gap-2">{
                    data.map((el, i) => (
                        <Link href={`/events/${el.id}`} key={i}>
                            {/* <InvitationCard>
                                <InvitationCard.Heading text={el.title}>
                                    <FaArrowRight className="text-gray-400" />
                                </InvitationCard.Heading>
                                <InvitationCard.HorizontalInfo>
                                    <p className="flex items-center">
                                        <MdCalendarToday className="w-4 aspect-square mr-2" />
                                        <b>{el.date.toDateString()}</b>
                                    </p>
                                    <p className="flex items-center">
                                        <MdGroup className="w-4 aspect-square mr-2" />
                                        <b>{el._count.attendees}</b>
                                    </p>
                                </InvitationCard.HorizontalInfo>
                            </InvitationCard> */}
                        </Link>
                    ))
                }</div> : <h1 className="p-10 text-center text-gray-500 font-medium">
                    You have no events to manage. Press the button down to create one.
                </h1>}
                <Button>asdj</Button>
            </main>
        </PageLayout>
    </>
}
