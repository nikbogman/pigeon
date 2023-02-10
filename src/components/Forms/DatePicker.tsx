import Datepicker from "tailwind-datepicker-react";
import useToggle from "../../hooks/useToggle";

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
        selected: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
    },
    datepickerClassNames: "top-12",
    defaultDate: undefined,
    language: "en",
} as const;

export default function DatePicker({ setDate }: {
    setDate: (v: Date) => void;
}) {
    const [isToggled, toggle]: [boolean, () => void] = useToggle();

    return <Datepicker
        options={options}
        onChange={(selectedDate: Date) => setDate(selectedDate)}
        show={isToggled}
        setShow={toggle}
    />
}