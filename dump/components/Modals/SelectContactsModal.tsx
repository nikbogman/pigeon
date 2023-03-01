import { Contact } from "@prisma/client";
import { useFieldArray, useFormContext } from "react-hook-form";
import { api } from "../../utils/api";

type Props = {
    contacts: Contact[];
}

const SelectContactModal: React.FC<Props> = (props) => {
    const methods = useFormContext();
    const { fields, insert, remove, replace, } = useFieldArray({
        control: methods.control,
        name: "attendeeIds",
        rules: {
            required: "Required to have at leat one attendee",
        }
    });
    const watcher = methods.watch('attendeeIds')
    return <>
        {props.contacts.map((contact, index) => {
            const included = watcher.includes(contact.id)
            console.log(methods.formState.errors.attendeeIds)
            return <div className="flex">
                <div className="flex items-center h-5">
                    <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        value={contact.id}
                        checked={included}
                        onChange={e => included ? remove(index) : methods.setValue(`attendeeIds.${index}` as const, e.target.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                </div>
                <div className="ml-2 text-sm">
                    <label htmlFor="helper-checkbox" className="font-medium text-gray-900">{contact.name}</label>
                    <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500">{contact.email}</p>
                </div>
            </div>
        })}
        {/* work on error handling */}
    </>
}

export default SelectContactModal;