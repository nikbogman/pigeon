// import type { Guest, Invitation } from "@prisma/client";
// import { Button } from "flowbite-react";
// import type { GetServerSidePropsContext } from "next";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import { serialize } from "superjson";
// import { createInnerTRPCContext } from "../../server/api/trpc";
// import { api } from "../../utils/api";
// import ssgHelpers from "../../utils/ssgHelpers";

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//     const trpcContext = createInnerTRPCContext({ session: null });
//     const trpcHelper = ssgHelpers(trpcContext);
//     try {
//         const guest = await trpcHelper.guest.getByIdAndInvitation.fetch(ctx.params!.id as string);
//         const props = {
//             guest: {
//                 ...guest,
//                 invitation: serialize({ ...guest.invitation, date: guest.invitation.date.toDateString() }).json,
//             }
//         }
//         return {
//             props
//         }

//     } catch (error) {
//         return {
//             notFound: true
//         }
//     }
// }

// type IProps = {
//     guest: Guest & {
//         invitation: Invitation & { date: string };
//     }
// }
// export default function GuestPage({ guest }: IProps) {
//     const mutation = api.guest.updateAttendanceById.useMutation();
//     const {
//         register,
//         handleSubmit,
//     } = useForm();
//     const router = useRouter();
//     const submitEvent = handleSubmit(async data => {
//         const answer = data.answer === 'yes' ? true : false;
//         mutation.mutate({ id: guest.id, attending: answer });
//         await router.push(`/guests/answers/${data.answer as string}`);
//     })

//     return <>
//         <main className="flex flex-col items-center justify-center p-5 h-screen leading-loose">
//             <h1>{guest.invitation.title}</h1>
//             <p>{guest.invitation.description}</p>
//             <p className="font-light text-xs mt-5">On: <b>{guest.invitation.date}</b></p>
//             <form onSubmit={submitEvent} className="mt-5">
//                 <p className="font-semibold">Would you attend this event?</p>
//                 <ul className="grid grid-cols-2 gap-x-5 mt-5 mb-10 max-w-md mx-auto">
//                     <li className="relative">
//                         <input
//                             {...register('answer', { required: true })}
//                             className="sr-only peer"
//                             type="radio"
//                             value="yes"
//                             name="answer"
//                             id="answer_yes"
//                         />
//                         <label className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent" htmlFor="answer_yes">Yes</label>

//                         <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
//                             👍
//                         </div>
//                     </li>

//                     <li className="relative">
//                         <input
//                             {...register('answer', { required: true })}
//                             className="sr-only peer"
//                             type="radio" value="no"
//                             name="answer"
//                             id="answer_no"
//                         />
//                         <label className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent" htmlFor="answer_no">No</label>

//                         <div className="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
//                             👎
//                         </div>
//                     </li>
//                 </ul>
//                 <Button type="submit" color="light" className="w-full">Submit</Button>
//             </form>
//         </main>
//     </>
// }