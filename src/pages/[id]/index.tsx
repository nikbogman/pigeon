import { Table, Button } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router"
import { FaCheck, FaDownload, FaEye, FaTimes, FaTrash } from "react-icons/fa";
import Layout from "../../components/Layout";
import { api } from "../../utils/api";
import { Card } from "flowbite-react";
import RemoveModal from "../../components/RemoveModal";
import QrModal from "../../components/QrModal";
import QrDownload from "../../components/QrDownload";


export default function () {
    const { query } = useRouter();
    const invitation = api.invitation.getById.useQuery(query.id! as string);

    return <>
        <Head>
            <title>{invitation.data?.title}</title>
        </Head>
        <Layout>
            <main className="mt-20 mb-16">
                <Card className="mx-2">
                    <div className="flex w-full items-center justify-between">
                        <h5 className="text-2xl font-bold  truncate">{invitation.data?.title}</h5>
                        <RemoveModal />
                    </div>
                    <div className="flex w-full items-center text-gray-700 tracking-tight text-xs justify-between">
                        <p>On:  <b>{invitation.data?.date.toDateString()}</b></p>
                    </div>
                    <p className="text-sm">{invitation.data?.description}</p>
                </Card>


                <Table className="w-full mt-5">
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
                        {invitation.data?.guests.map((g, i) => (
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