import { useForm, useFormContext } from "react-hook-form";
import DatePicker from "./DatePicker";
import { Button, TextInput, Label, Textarea, Tooltip } from "flowbite-react";
import { FaTrash, FaPlus, FaInfoCircle } from "react-icons/fa";
import { useFieldArray, FormProvider } from "react-hook-form";
export default function () {
    const methods = useForm({
        defaultValues: {
            title: "",
            date: new Date(),
            description: "",
            guests: [{ name: '' }]
        }
    });

    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(async (data, e) => console.log({ data }))} >
                <div>
                    <div className="mb-2 flex items-center">
                        <Label htmlFor="title" value="Title" />
                    </div>
                    <TextInput
                        id="title"
                        placeholder="e.g My birthady party or prom" required={true} sizing="lg"
                        {...methods.register('title')}
                    />
                </div>
                <div className='mt-2'>
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Description" className="text-lg" />
                    </div>
                    <Textarea
                        id="comment"
                        placeholder="e.g Hello Dear friend, I would lie to invite you..." required={true} rows={6}
                        {...methods.register('description')}
                    />
                </div>
                <div className='mt-2'>
                    <div className="mb-2 block ">
                        <Label htmlFor="date" value="Date" className="text-lg" />
                    </div>
                    <DatePicker setDate={(v: Date) => methods.setValue("date", v)} />
                </div>
                <GuestsInput />
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 max-[640px]:w-full" type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
}

// add unique validation
// add regex pattern validation 
function GuestsInput() {

    const methods = useFormContext();
    const { fields, insert, remove } = useFieldArray({
        control: methods.control,
        name: "guests",
        rules: {
            required: true
        }
    });
    return <>
        <div className='mt-2'>
            <div className="mb-2 block">
                <Label htmlFor="g" value="Guests" className="text-lg" />
            </div>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500"
            outline={true}
            onClick={() => insert(0, { name: "" })}
        >Add Guest<FaPlus className="ml-5" /></Button>
        {fields.map((field, index) => (
            <div className={`${fields.length === 1 ? `block` : `flex`} h-fit items-center mt-2 mb-2 max-[640px]:w-full`} key={field.id}>
                <TextInput
                    id="guest-input"
                    placeholder="e.g John Doe" required={true} sizing="lg"
                    className="max-[640px]:w-full"
                    {...methods.register(`guests.${index}.name` as const)}
                />
                {fields.length > 1 ? <button
                    onClick={() => remove(index)}
                    className="bg-red-500 flex text-white font-bold p-0.5 aspect-square rounded-lg h-min border border-transparent">
                    <FaTrash className="h-5 w-5 m-4" />
                </button> : null}
            </div>
        ))}
    </>
}


// const Tip = ({ content }: { content: string }) => <Tooltip
//     content={content}
//     style="light"
//     animation="duration-300"
// ><button type="button" className="ml-5 flex justify-center"><FaInfoCircle /></button></Tooltip>