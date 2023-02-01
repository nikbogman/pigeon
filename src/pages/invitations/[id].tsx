import { GetServerSidePropsContext } from "next";
import { prisma } from "../../server/db";
import { Label, Select, Table } from "flowbite-react";
import Head from "next/head";
import { FaCheck, FaTimes } from "react-icons/fa";
import Layout from "../../components/Layout";
import { Card } from "flowbite-react";
import RemoveModal from "../../components/Modals/RemoveModal";
import QrModal from "../../components/QrModal";
import QrDownload from "../../components/QrDownload";
import { Invitation, Guest } from "@prisma/client";
import { serialize } from "superjson";
import { useState } from "react";
import restrict from "../../utils/restrict";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const invitation = await prisma.invitation.findUnique({
        where: { id: ctx.params!.id as string },
        include: { guests: true }
    })
    if (!invitation) return {
        notFound: true
    }
    // auth before prisma query
    return restrict(
        ctx,
        {
            invitation: serialize({
                ...invitation, date: invitation?.date.toDateString()
            }).json
        }
    );
}

export default function ({ invitation }: { invitation: Invitation & { guests: Guest[] } & { date: string } }) {
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
                    <div className="flex w-full items-center text-gray-700 tracking-tight text-xs justify-between">
                        <p>On:  <b>{invitation.date}</b></p>
                    </div>
                    <p className="text-sm">{invitation.description}</p>
                </Card>
                <div className='mt-5 w-full flex items-center justify-around'>
                    <div className="mb-2 block">
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

                <Table className="w-full mt-2">
                    <Table.Head>
                        <Table.HeadCell>
                            Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Attending
                        </Table.HeadCell>
                        <Table.HeadCell>
                        </Table.HeadCell>
                        <Table.HeadCell>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data.map((g, i) => (
                            <Table.Row key={i}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                    {g.name}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    {g.attending ? <FaCheck style={{ color: '#22c55e' }} /> : <FaTimes style={{ color: '#ef4444' }} />}
                                </Table.Cell>
                                {/*  */}
                                <QrModal url={g.name} name={g.name} />
                                <QrDownload />
                            </Table.Row>
                        ))}

                    </Table.Body >
                </Table>
            </main>
        </Layout>
    </>
}