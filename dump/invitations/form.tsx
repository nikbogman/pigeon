// import { useForm } from "react-hook-form";
// import { Button, TextInput, Textarea, Label, Alert } from "flowbite-react";
// import { FormProvider } from "react-hook-form";
// import { api } from "../../utils/api";
// import { useRouter } from "next/router";
// import DatePicker from "../../components/Forms/DatePicker";
// import GuestsInput from "../../components/Forms/GuestsInput";
// import type { GetServerSidePropsContext } from "next";
// import { getServerAuthSession } from "../../server/auth";
// import ErrorCard from "../../components/Cards/ErrorCard";
// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//     const session = await getServerAuthSession(ctx);
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/auth/signIn',
//                 permanent: false,
//             },
//         }
//     }
//     return { props: {} }
// }

// const textFieldValidator = {
//     pattern: {
//         value: /[\p{L}\s'.?!,\n]/,
//         message: "Only characters are allowed in the text fields."
//     }
// }
// export default function InvitationForm() {
//     const mutation = api.invitation.create.useMutation();
//     const router = useRouter();

//     const submit = async (data: {
//         title: string;
//         date: Date;
//         description: string;
//         guests: { name: string }[];
//     }) => {
//         mutation.mutate(data);
//         await router.push('/')
//     }

//     const methods = useForm({
//         defaultValues: {
//             title: "",
//             date: new Date(),
//             description: "",
//             guests: [{ name: "" }]
//         }
//     });

//     return (
//         <main className="m-2">
//             <h1 className="p-10 font-extrabold text-center text-gray-500 text-2xl">
//                 Create an invitation for event
//             </h1>
//             <FormProvider {...methods}>
//                 <Alert color="info">
//                     <span>
//                         <span className="font-medium">
//                             Info alert!
//                         </span>
//                         {' '}You should provide at least two words in each text input, otherwise it does not count as text.
//                     </span>
//                 </Alert>
//                 <form onSubmit={methods.handleSubmit(submit)} className="p-4 border-t-2 rounded-lg shadow-lg">
//                     <div className="text-lg mb-2">
//                         <Label htmlFor="title" value="Title" />
//                     </div>
//                     <TextInput
//                         id="title"
//                         placeholder="e.g My birthady party or prom"
//                         required={true}
//                         sizing="lg"
//                         {...methods.register('title', textFieldValidator)}
//                     />
//                     {methods.formState.errors.title && <ErrorCard className="mt-2">
//                         <span>{methods.formState.errors.title.message}</span>
//                     </ErrorCard>}

//                     <div className="text-lg mt-4 mb-2">
//                         <Label htmlFor="description" value="Description" className="text-lg" />
//                     </div>
//                     <Textarea
//                         id="description"
//                         placeholder="e.g Hello Dear friend, I would lie to invite you..."
//                         required={true}
//                         rows={6}
//                         {...methods.register('description', textFieldValidator)}
//                     />
//                     {methods.formState.errors.description && <ErrorCard className="mt-2">
//                         <span>{methods.formState.errors.description.message}</span>
//                     </ErrorCard>}

//                     <div className="text-lg mt-4 mb-2">
//                         <Label value="Date" className="text-lg" />
//                     </div>
//                     <DatePicker setDate={(v: Date) => methods.setValue("date", v)} />

//                     <GuestsInput />
//                     <Button className="max-[640px]:w-full bg-gradient-to-r from-cyan-500 to-blue-500" type="submit">Submit</Button>
//                 </form>
//             </FormProvider>
//         </main >

//     );
// }

// // const Tip = ({ content }: { content: string }) => <Tooltip
// //     content={content}
// //     style="light"
// //     animation="duration-300"
// // ><button type="button" className="ml-5 flex justify-center"><FaInfoCircle /></button></Tooltip>