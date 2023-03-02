import { createFormContext } from "@mantine/form";

export type FormValues = {
    title: string;
    date: Date;
    description: string;
    attendeeIds: string[]
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();
