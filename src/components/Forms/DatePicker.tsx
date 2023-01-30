import Datepicker from "tailwind-datepicker-react";
import { useState } from "react";

const options = {
    title: "",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date(),
    theme: {
        background: "",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "bg-gray-100",
        input: "text-[calc(10px + 2vmin)]",
        inputIcon: "",
        selected: "bg-gradient-to-r from-purple-500 to-blue-500 text-white",
    },
    datepickerClassNames: "top-12",
    defaultDate: undefined,
    language: "en",
} as const;

interface IProps {
    setDate: (v: Date) => void;
}
export default function ({ setDate }: IProps) {
    const [show, setShow] = useState<boolean>(false);

    return <Datepicker
        options={options}
        onChange={(selectedDate: Date) => setDate(selectedDate)}
        show={show}
        setShow={(state: boolean) => setShow(state)}
    />
}