import { Guest, Invitation } from "@prisma/client";
import { Button } from "flowbite-react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import * as guestsService from "../../lib/guests.service";
import * as invitationsService from "../../lib/invitations.service";
export async function getStaticPaths() {

    const guests = await guestsService.findMany();
    const paths = guests.map(guest => ({ params: { id: guest.id } }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const guest = await guestsService.findById(params!.id as string);
    const invitation = await invitationsService.findById(guest.invitationId);

    return {
        props: {
            guest: {
                ...guest,
                invitation: {
                    ...invitation,
                    date: invitation.date.toDate().toDateString()
                }
            }
        },
        revalidate: 10
    }
}
type IProps = {
    guest: Guest & {
        invitation: Invitation & { date: string };
    }
}
export default function ({ guest }: IProps) {
    const mutation = api.guest.updateAttendanceById.useMutation();
    const {
        register,
        handleSubmit,
    } = useForm();
    const router = useRouter();
    const submitEvent = handleSubmit(data => {
        const answer = data.answer === 'yes' ? true : false;
        mutation.mutate({ id: guest.id, attending: answer });
        router.push('/guests/answers/' + data.answer);
    })

    return <>
        <main className="flex flex-col items-center justify-center p-5 h-screen leading-loose">
            <h1 >{guest.invitation.title}</h1>
            <p>{guest.invitation.description}</p>
            <p className="font-light text-xs mt-5">On: <b>{guest.invitation.date}</b></p>
            <form onSubmit={submitEvent} className="mt-5">
                <p className="font-semibold">Would you attend this event?</p>
                <ul className="grid grid-cols-2 gap-x-5 mt-5 mb-10 max-w-md mx-auto">
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
                <Button type="submit" color="light" className="w-full">Submit</Button>
            </form>
        </main>
    </>
}