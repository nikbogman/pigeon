import { Guest, Invitation } from "@prisma/client";
import { Button } from "flowbite-react";
import { GetStaticPropsContext } from "next";
import { useForm } from "react-hook-form";
import { serialize } from "superjson";
import { prisma } from "../../server/db";
import { api } from "../../utils/api";
export async function getStaticPaths() {
    const guests: { id: string }[] = await prisma.guest.findMany({
        where: {},
        select: {
            id: true
        }
    })
    const paths = guests.map((guest: { id: string }) => ({
        params: { id: guest.id },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const guest = await prisma.guest.findUnique({
        where: { id: params!.id as string },
        include: { invitation: true }
    })
    const invitation = { ...guest?.invitation, date: guest?.invitation.date.toDateString() }
    return {
        props: {
            guest: serialize({ ...guest, invitation }).json
        },
        revalidate: 10
    }
}

export default function ({ guest }: {
    guest: Guest & {
        invitation: Invitation;
    } & { date: string }
}) {
    const mutation = api.invitation.changeAttendance.useMutation();
    const {
        register,
        handleSubmit,
    } = useForm();

    const submitEvent = handleSubmit(data => {
        const answer = data.answer === 'yes' ? true : false;
        mutation.mutate({ id: guest.id, attending: answer });
    })

    return <>
        <main className="flex flex-col items-center justify-center p-5 h-screen">
            <h1>{guest.invitation.title}</h1>
            <p>{guest.invitation.description}</p>
            <form onSubmit={submitEvent}>
                <ul className="grid grid-cols-2 gap-x-5 m-10 max-w-md mx-auto">
                    <li className="relative">
                        <input
                            {...register('answer', { required: true })}
                            className="sr-only peer"
                            type="radio"
                            value="yes"
                            name="answer"
                            id="answer_yes"
                        />
                        <label className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent" htmlFor="answer_yes">Yes</label>

                        <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
                            👍
                        </div>
                    </li>

                    <li className="relative">
                        <input
                            {...register('answer', { required: true })}
                            className="sr-only peer"
                            type="radio" value="no"
                            name="answer"
                            id="answer_no"
                        />
                        <label className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent" htmlFor="answer_no">No</label>

                        <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
                            👎
                        </div>
                    </li>
                </ul>
                <Button type="submit" className="w-full">submit</Button>
            </form>
        </main>
    </>
}