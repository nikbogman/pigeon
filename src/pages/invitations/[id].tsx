import type { GetServerSidePropsContext } from "next";
import { Label, Select } from "flowbite-react";
import Head from "next/head";
import RemoveModal from "../../components/Modals/RemoveModal";
import type { Invitation, Guest } from "@prisma/client";
import { serialize } from "superjson";
import { useState } from "react";
import ssgHelpers from "../../utils/ssgHelpers";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { getServerAuthSession } from "../../server/auth";
import generateQrCode from "../../lib/generateQrCode";
import GuestCard from "../../components/Cards/GuestCard";
import { MdCalendarToday, MdGroup } from "react-icons/md";
import InvitationCard from "../../components/Cards/InvitationCard";
import PageLayout from "../../components/Layouts/PageLayout";

type IProps = {
    invitation: Invitation & {
        guests: Guest[]
    } & {
        date: string
    },
    dataUrl: string;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getServerAuthSession(ctx);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/signIn',
                permanent: false,
            },
        }
    }
    const trpcContext = createInnerTRPCContext({ session });
    const trpcHelper = ssgHelpers(trpcContext);

    try {
        const invitation = await trpcHelper.invitation.getByIdWithGuests.fetch(ctx.params!.id as string);
        const dataUrl = await generateQrCode(ctx.params!.id as string);
        return {
            props: {
                invitation: serialize({ ...invitation, date: invitation?.date.toDateString() }).json,
                dataUrl
            }
        }

    } catch (error) {
        return {
            notFound: true
        }
    }
}

const filters: { [key: string]: (guests: Guest[]) => Guest[] } = {
    "Attending": (guests: Guest[]) => guests.filter(g => g.attending === true),
    "Not Attending": (guests: Guest[]) => guests.filter(g => g.attending === false),
}

export default function InvitationPage({ invitation, dataUrl }: IProps) {
    const [filter, setFilter] = useState<string>('All');

    const data = filters[filter] ? filters[filter]!(invitation.guests) : invitation.guests;

    return <>
        <Head>
            <title>{invitation.title}</title>
        </Head>
        <PageLayout>
            <main className="mt-20 mb-16">
                <InvitationCard className="m-2">
                    <InvitationCard.Heading text={invitation.title}>
                        <RemoveModal />
                    </InvitationCard.Heading>
                    <InvitationCard.HorizontalInfo>
                        <p className="flex items-center">
                            <MdCalendarToday className="w-4 aspect-square mr-2" />
                            <b>{invitation.date}</b>
                        </p>
                    </InvitationCard.HorizontalInfo>
                    <p className="text-sm">{invitation.description}</p>
                </InvitationCard>

                <div className="mt-5 w-full flex items-center justify-around">
                    <div className="flex items-center">
                        <Label htmlFor="g" value="Filter" className="text-lg mr-4" />
                        <Select
                            id="show"
                            className="w-fit"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option>All</option>
                            <option>Attending</option>
                            <option>Not Attending</option>
                        </Select>
                    </div>
                    <p className="flex items-center">
                        <MdGroup className="w-4 aspect-square mr-2" />
                        <Label value={data.length.toString()} />
                    </p>
                </div>

                <div className="mt-5">
                    {data.length >= 1 ?
                        data.map((g, i) => <GuestCard guest={g} dataUrl={dataUrl} key={i} />)
                        :
                        <h1 className="p-10 text-center text-gray-500 font-medium">
                            {filter === "Attending" ? "All guests are attending" : "No one is attending currently"}
                        </h1>
                    }
                </div>
            </main>
        </PageLayout>
    </>
}