import { useFormContext } from "react-hook-form";
import { Button, TextInput } from "flowbite-react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useFieldArray } from "react-hook-form";
import InputLayout from "./InputLayout";
import ErrorAlert from "../ErrorAlert";
export default function GuestsInput() {
    const methods = useFormContext();
    const { fields, insert, remove, replace } = useFieldArray({
        control: methods.control,
        name: "guests",
        rules: {
            required: true,
        }
    });
    return <>
        <InputLayout value="Guests" />
        <div className="flex items-center justify-between">
            <Button gradientDuoTone="cyanToBlue"
                outline={true}
                onClick={() => insert(0, "")}
            >Add guest<FaPlus className="ml-5" /></Button>
            <h2>{fields.length}</h2>
            <Button
                style={{ background: '#9CA3AF' }}
                outline={true}
                onClick={() => replace([""])}
            >Clear all<FaTrash className="ml-5" /></Button>
        </div>
        {fields.map((field, index) => {
            const errors = methods.formState.errors.guests;
            let error = null;
            // @ts-ignore
            if (errors && errors[index]) {
                // @ts-ignore
                error = <ErrorAlert normal={errors[index].name.message} />
            }
            return <div className="my-2" key={field.id}>
                <div className={`${fields.length === 1 ? `block` : `flex`} h-fit items-center max-[640px]:w-full`}>
                    <TextInput
                        id="guest-input"
                        placeholder="e.g John Doe" required={true} sizing="lg"
                        className="max-[640px]:w-full"
                        {...methods.register(`guests.${index}.name` as const, {
                            pattern: {
                                value: /^[a-z\u0400-\u04FF ,.'-]+$/,
                                message: "Please provide only valid names!"
                            },
                            validate: (value, formValues) => {
                                const existing: string[] = formValues.guests.map((g: { name: string }) => g.name)
                                const unique = existing.indexOf(value) === index;
                                return unique || "Please provide only unique names!";
                            }
                        })}
                    />
                    {fields.length > 1 ? <button
                        onClick={() => remove(index)}
                        className="bg-red-500 flex text-white font-bold p-0.5 ml-2 aspect-square rounded-lg h-min border border-transparent">
                        <FaTrash className="h-5 w-5 m-4" />
                    </button> : null}
                </div>
                {error}
            </div>
        })}
    </>
}
