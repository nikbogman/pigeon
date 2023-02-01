import { useFormContext } from "react-hook-form";
import { Button, TextInput, Label } from "flowbite-react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useFieldArray } from "react-hook-form";
import InputLayout from "./InputLayout";
export default function () {
    const methods = useFormContext();
    const { fields, insert, remove, replace } = useFieldArray({
        control: methods.control,
        name: "guests",
        rules: {
            required: true
        }
    });
    return <>
        <InputLayout value="Guests" />
        <div className="flex items-center justify-between">
            <Button gradientDuoTone="greenToBlue"
                outline={true}
                onClick={() => insert(0, { name: "" })}
            >Add guest<FaPlus className="ml-5" /></Button>
            <h2>{fields.length}</h2>
            <Button
                style={{ background: ' #9CA3AF' }}
                outline={true}
                onClick={() => replace([{ name: "" }])}
            >Clear all<FaTrash className="ml-5" /></Button>
        </div>

        {fields.map((field, index) => (
            <div className={`${fields.length === 1 ? `block` : `flex`} h-fit items-center mt-2 mb-2 max-[640px]:w-full`}
                key={field.id}>
                <TextInput
                    id="guest-input"
                    placeholder="e.g John Doe" required={true} sizing="lg"
                    className="max-[640px]:w-full"
                    {...methods.register(`guests.${index}.name` as const)}
                />
                {fields.length > 1 ? <button
                    onClick={() => remove(index)}
                    className="bg-red-500 flex text-white font-bold p-0.5 ml-2 aspect-square rounded-lg h-min border border-transparent">
                    <FaTrash className="h-5 w-5 m-4" />
                </button> : null}
            </div>
        ))}
    </>
}
