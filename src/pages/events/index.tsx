import { Center, Group, Text, Paper, Flex, Title } from "@mantine/core";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdCalendarToday, MdGroup } from "react-icons/md";
import PageLayout from "../../components/Layouts/PageLayout";
import LoadingScreen from "../../components/LoadingScreen";
import useAuthenticated from "../../hooks/useAuthenticated";
import { api } from "../../utils/api";
export default function EventsPage() {
    const { status } = useAuthenticated();

    const query = api.event.getAllIncludingAttendeesCount.useQuery(undefined, {
        enabled: status === "authenticated"
    });

    if (query.isLoading) return <LoadingScreen />;

    return <>
        <PageLayout>
            <main className="my-14 px-2">
                {query.data ? query.data.map((el, index) => <Link href={`/events/${el.id}`} key={index}>
                    <Paper shadow="md" radius="md" p="lg" my="sm">
                        <Flex justify="space-between">
                            <div>
                                <Title order={3}>{el.title}</Title>
                                <Group spacing="lg">
                                    <Group spacing={6} mt={4}>
                                        <MdCalendarToday style={{ color: "#868e96" }} />
                                        <Text color="dimmed">{el.date.toLocaleDateString()}</Text>
                                    </Group>
                                    <Group spacing={6} mt={4}>
                                        <MdGroup style={{ color: "#868e96" }} />
                                        <Text color="dimmed">{el._count.attendees.toString()}</Text>
                                    </Group>
                                </Group>
                            </div>
                            <Center>
                                <HiOutlineArrowRight />
                            </Center>
                        </Flex>
                    </Paper >
                </Link>) :
                    <h1 className="p-10 text-center text-gray-500 font-medium">
                        You have no events to manage. Press the button down to create one.
                    </h1>
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
