import type { GetServerSidePropsContext } from "next";
import { Label, Select } from "flowbite-react";
import Head from "next/head";
import Layout from "../../components/Layout";
import { Card } from "flowbite-react";
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
        const dataUrl = await generateQrCode();
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

export default function InvitationPage({ invitation, dataUrl }: IProps) {
    const [filter, setFilter] = useState<string>('All');

    const data = (() => {
        switch (filter) {
            case "Attending":
                return invitation.guests.filter(g => g.attending === true);
            case "Not Attending":
                return invitation.guests.filter(g => g.attending === false);
            default:
                return invitation.guests;
        }
    })()


    return <>
        <Head>
            <title>{invitation.title}</title>
        </Head>
        <Layout>
            <main className="mt-20 mb-16">
                <Card className="mx-2">
                    <div className="flex w-full items-center justify-between">
                        <h5 className="text-2xl font-bold  truncate">{invitation.title}</h5>
                        <RemoveModal />
                    </div>
                    <p className="flex w-full items-center text-gray-700 tracking-tight text-xs">
                        <MdCalendarToday className="w-4 aspect-square mr-2" />
                        <b>{invitation.date}</b>
                    </p>
                    <p className="text-sm">{invitation.description}</p>
                </Card>
                <div className="mt-5 w-full flex items-center justify-around">
                    <div className="flex items-center">
                        <div className="mr-2 items-center">
                            <Label htmlFor="g" value="Filter" className="text-lg" />
                        </div>
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
                    {data.map((g, i) => <GuestCard guest={g} dataUrl={dataUrl} key={i} />)}
                </div>
            </main>
        </Layout>
    </>
}