import { api } from "../../../utils/api";
import { Button, TextInput, Textarea, Alert, Loader, Center, } from "@mantine/core";
import useAuthenticated from "../../../hooks/useAuthenticated";
import { DateTimePicker } from "@mantine/dates";
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import { useState } from "react";
import MultiSelectContacts from "../../../components/MutiSelectContacts";
import { useForm } from "@mantine/form";

type FormValues = {
    title: string;
    description: string;
    attendeeIds: string[];
    date: Date | undefined
}

export default function CreateEventPage() {
    const { status } = useAuthenticated();

    const contactQuery = api.contact.getAll.useQuery(undefined, {
        enabled: status === "authenticated"
    });

    const mutation = api.event.create.useMutation();
    const [value, setValue] = useState<Date | null>(null);

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            attendeeIds: [],
            date: undefined
        } as FormValues
    });
    const onSubmit = form.onSubmit(async (data) => {
        console.log(data)
    })

    const ContactInput = () => {
        if (contactQuery.data)
            return <MultiSelectContacts
                data={contactQuery.data.map(c => ({ value: c.id, description: c.email, label: c.name }))}
                value={form.values.attendeeIds}
                onChange={value => form.setFieldValue('attendeeIds', value as never[])}
            />
        return <Alert icon={<FaExclamationCircle size="1rem" />} title="Bummer!" color="red">
            You have contacts to add as attendees. You need to go back and add some.
            <Button
                leftIcon={<FaArrowLeft />}
                mt="sm"
                variant="outline"
                color="red" fullWidth
            >Click here to do so</Button>
        </Alert>
    }


    return <>
        <form onSubmit={onSubmit}>
            <TextInput
                label="Title"
                placeholder="My 10th birthday"
                required={true}
                size="md"
                withAsterisk
                {...form.getInputProps('title')}
            />
            <Textarea
                label="Description"
                placeholder="I would like to invite you to..."
                required={true}
                size="md"
                withAsterisk
                my="xl"
                minRows={4}
                {...form.getInputProps('description')}
            />
            <DateTimePicker
                timeInputProps={{ 'aria-label': 'Pick time' }}
                my="xl"
                size="md"
                dropdownType="modal"
                label="Pick date"
                placeholder="Pick date"
                withAsterisk
                value={form.values.date}
                onChange={value => {
                    form.setFieldValue('date', new Date(value!.toISOString()))
                }}
            />

            {contactQuery.status === "loading" ? <Center
                my="xl"
                mx="auto"
                h={50}
            >
                <Loader color="gray" />
            </Center> : <ContactInput />}
            <Button
                type="submit"
                fullWidth
                variant="outline"
                color="dark"
            >Submit</Button>
        </form>
    </>
}

