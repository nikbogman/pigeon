// import Head from "next/head";
// import Link from "next/link";
// import type { GetServerSidePropsContext } from "next";
// import InvitationCard from "../../components/Cards/InvitationCard";
// import { createInnerTRPCContext } from "../../server/api/trpc";
// import { getServerAuthSession } from "../../server/auth";
// import { api } from "../../utils/api";
// import ssgHelpers from "../../utils/ssgHelpers";
// import { FaArrowRight } from "react-icons/fa";
// import { MdCalendarToday, MdGroup } from "react-icons/md";
// import PageLayout from "../../components/Layouts/PageLayout";

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
//     const trpcContext = createInnerTRPCContext({ session });
//     const trpcHelper = ssgHelpers(trpcContext);
//     await trpcHelper.invitation.getAllWithGuestCount.prefetch();
//     return {
//         props: {
//             trpcState: trpcHelper.dehydrate()
//         }
//     }
// }

// export default function InvitationsPage() {
//     const { data } = api.invitation.getAllWithGuestCount.useQuery();
//     return (
//         <>
//             <Head>
//                 <title>Pigeon Home</title>
//             </Head>
//             <PageLayout>
//                 <main className="my-16 px-2 md:mx-10">
//                     {data?.length ? <div className="grid lg:grid-cols-3 md:grid-cols-2 max-sm:grid-cols-1 gap-2">{
//                         data.map((el, i) => (
//                             <Link href={`/invitations/${el.id}`} key={i}>
//                                 {/* md?? */}
//                                 <InvitationCard className="md:max-w-xl md:flex-col">
//                                     <InvitationCard.Heading text={el.title}>
//                                         <FaArrowRight className="text-gray-400" />
//                                     </InvitationCard.Heading>
//                                     <InvitationCard.HorizontalInfo>
//                                         <p className="flex items-center">
//                                             <MdCalendarToday className="w-4 aspect-square mr-2" />
//                                             <b>{el.date.toDateString()}</b>
//                                         </p>
//                                         <p className="flex items-center">
//                                             <MdGroup className="w-4 aspect-square mr-2" />
//                                             <b>{el._count.guests}</b>
//                                         </p>
//                                     </InvitationCard.HorizontalInfo>
//                                 </InvitationCard>
//                             </Link>
//                         ))
//                     }</div> : <h1 className="p-10 text-center text-gray-500 font-medium">
//                         You have no invitations created. Press the button to do so.
//                     </h1>}
//                 </main>
//             </PageLayout>
//         </>
//     );
// }
