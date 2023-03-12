import PageLayout from "../components/Layouts/PageLayout";
import { api } from "../utils/api";
import ContactCard from "../components/Cards/ContactCard";
import useAuthenticated from "../hooks/useAuthenticated";
import CreateContactModal from "../components/Modals/Contact/CreateContactModal";
import { TRPCRefetchContextProvider } from "../context/TRPCRefetchContext";
import LoadingScreen from "../components/LoadingScreen";
import { SimpleGrid } from "@mantine/core";
import { Contact } from "@prisma/client";

export default function ContactsPage() {
    const { status } = useAuthenticated();
    const query = api.contact.getAll.useQuery(undefined, {
        enabled: status === "authenticated"
    });

    if (query.isLoading) return <LoadingScreen />;

    return <>
        <PageLayout>
            <TRPCRefetchContextProvider refetch={query.refetch}>
                <main>
                    {query.data && query.data.length > 0 ? <ContactCards contacts={query.data} /> :
                        <h1 className="p-10 text-center text-gray-500 font-medium">
                            You have no contacts. Press the button down to add someone.
                        </h1>}
                </main>
                <CreateContactModal />
            </TRPCRefetchContextProvider>
        </PageLayout>
    </>
}


const ContactCards: React.FC<{ contacts: Contact[] }> = ({ contacts }) => <SimpleGrid cols={1}>
    {contacts.map((contact, index) => <ContactCard contact={contact} key={index} />)}
</SimpleGrid>