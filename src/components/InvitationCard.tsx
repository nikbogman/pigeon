import { Accordion, Button, Card } from "flowbite-react";
import React from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";

interface IProps {
    title: string;
    description: string;
    date: Date;
    guestCount: number;
}

export default function (props: IProps) {
    return <Card
        horizontal={true}
        className="mt-5"
    >
        <div className="flex w-full items-center justify-between">
            <h5 className="text-2xl font-bold  truncate">{props.title}</h5>
            <FaArrowRight className="text-gray-600" />
        </div>
        <div className="flex w-full items-center text-gray-700 tracking-tight text-xs justify-between">
            <p>On:  <b>{props.date.toDateString()}</b></p>
            <p>Guests:  <b>{props.guestCount}</b></p>
        </div>
    </Card>
}
