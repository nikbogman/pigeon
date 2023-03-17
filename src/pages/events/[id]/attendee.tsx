import { useRouter } from "next/router";
import { useState } from "react";
import useAuthenticated from "../../../hooks/useAuthenticated";
import { api } from "../../../utils/api";
import Error from "next/error";
import LoadingScreen from "../../../components/LoadingScreen";
import { Button, Group, Radio, Title, Text, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function AttendeePage() {
    const router = useRouter();
    const id = router.query.id as string;
    const [response, setResponse] = useState<boolean | null>(null);
    const { data, status } = useAuthenticated();
    const query = api.event.getByIdIncludingAttendees.useQuery(id, {
        enabled: status === "authenticated" && !!id,
    });
    const form = useForm({
        initialValues: {
            response: null
        } as { response: boolean | null }
    })
    if (query.isError && query.error.data) return <Error
        statusCode={query.error.data.httpStatus || 500}
        title={query.error.message}
    />;
    if (query.isLoading) return <LoadingScreen />;

    if (!query.data || !data || !data.user) return <Error
        statusCode={500}
        title="Something went wrong"
    />;
    const attendee = query.data.attendees[0]//.find(attendee => attendee.contact.email === data.user?.email)



    if (response) return <>
    </>
    else if (response === false) return <>
    </>
    else return <>
        <Title order={2}>{query.data.title}</Title>
        <Text>{query.data.description}</Text>
        <Radio.Group
            name="attendeeResponse"
            label="Select your response to the invitation"
            withAsterisk
        >
            <Group mt="xs">
                {/* should costumize these inputs */}
            </Group >
        </Radio.Group >
    </>
}