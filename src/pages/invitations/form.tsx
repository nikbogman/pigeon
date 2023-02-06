import { useForm } from "react-hook-form";
import { Button, TextInput, Textarea, Alert } from "flowbite-react";
import { FormProvider } from "react-hook-form";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import DatePicker from "../../components/Forms/DatePicker";
import GuestsInput from "../../components/Forms/GuestsInput";
import InputLayout from "../../components/Forms/InputLayout";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import { HiInformationCircle } from 'react-icons/hi'
import ErrorAlert from "../../components/ErrorAlert";
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/signIn',
                permanent: false,
            },
        }
    }
    return { props: {} }
}
export default function InvitationForm() {
    const mutation = api.invitation.create.useMutation();
    const router = useRouter();

    const submit = async (data: {
        title: string;
        date: Date;
        description: string;
        guests: { name: string }[];
    }) => {
        mutation.mutate(data);
        await router.push('/')
    }

    const methods = useForm({
        defaultValues: {
            title: "",
            date: new Date(),
            description: "",
            guests: [{ name: "" }]
        }
    });

    return (
        <main className="p-7">
            {methods.formState.errors.title || methods.formState.errors.description ? <ErrorAlert
                bolded="Info alert"
                normal="Only characters are allowed in the text fields."
            /> : null}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submit)} >
                    <InputLayout value="Title">
                        <TextInput
                            id="title"
                            placeholder="e.g My birthady party or prom"
                            required={true}
                            sizing="lg"
                            {...methods.register('title', {
                                pattern: /^[a-z\u0400-\u04FF ,.'-]+$/
                            })}
                        />
                    </InputLayout>

                    <InputLayout value="Description">
                        <Textarea
                            id="comment"
                            placeholder="e.g Hello Dear friend, I would lie to invite you..."
                            required={true}
                            rows={6}
                            {...methods.register('description', {
                                pattern: /^[a-z\u0400-\u04FF ,.'-]+$/
                            })}
                        />
                    </InputLayout>

                    <InputLayout value="Date">
                        <DatePicker setDate={(v: Date) => methods.setValue("date", v)} />
                    </InputLayout>

                    <GuestsInput />
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 max-[640px]:w-full" type="submit">Submit</Button>
                </form>
            </FormProvider>
        </main>

    );
}

// const Tip = ({ content }: { content: string }) => <Tooltip
//     content={content}
//     style="light"
//     animation="duration-300"
// ><button type="button" className="ml-5 flex justify-center"><FaInfoCircle /></button></Tooltip>