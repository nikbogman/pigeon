import { Card } from "flowbite-react";

const InvitationCard = (props: { className?: string, children: React.ReactNode }) => <Card
    horizontal={true}
    className={props.className}
>{props.children}</Card>;

InvitationCard.Heading = (props: { text: string, children: React.ReactNode }) => <div
    className="w-full flex items-center justify-between">
    <h1 className="mr-5 text-2xl font-bold truncate">{props.text}</h1>
    {props.children}
</div>;

InvitationCard.HorizontalInfo = (props: { children: React.ReactNode }) => <div
    className="w-full flex items-center justify-between text-xs text-gray-700 tracking-tight">
    {props.children}
</div>;

export default InvitationCard;



