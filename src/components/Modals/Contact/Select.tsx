import { Modal } from "@mantine/core";
import { api } from "../../../utils/api";

const SelectContacts: React.FC = () => {
    const query = api.contact.getAll.useQuery();
    /*
        if use has no contacts added throw error
    */

    return <>

    </>
}
export default {};