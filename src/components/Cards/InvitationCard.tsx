import { Card } from "flowbite-react";
import { FaArrowRight } from "react-icons/fa";
import { MdGroup, MdCalendarToday } from "react-icons/md";

type TProps = {
    title: string;
    description: string;
    date: Date;
    guestCount: number;
}

export default function InvitationCard(props: TProps) {
    return <Card
        horizontal={true}
        className="mt-5"
    >
        <div className="flex w-full items-center justify-between">
            <h5 className="text-2xl font-bold truncate mr-5">{props.title}</h5>
            <FaArrowRight className="text-gray-400" />
        </div>
        <div className="flex w-full items-center text-gray-700 tracking-tight text-xs justify-between">
            <p className="flex items-center"><MdCalendarToday className="w-4 aspect-square mr-2" /><b>{props.date.toDateString()}</b></p>
            <p className="flex items-center"><MdGroup className="w-4 aspect-square mr-2" /><b>{props.guestCount}</b></p>
        </div>
    </Card>
}
