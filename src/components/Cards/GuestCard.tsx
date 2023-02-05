import type { Guest } from "@prisma/client";
import { Card } from "flowbite-react";
import QrDownload from "../QrDownload";
import QrModal from "../QrModal";

type TProps = {
    guest: Guest;
    dataUrl: string;
}

export default function GuestCard(props: TProps) {
    return <Card
        horizontal={true}
        className={`mx-2 mt-2 border-${props.guest.attending ? 'green' : 'red'}-500`}
    >
        <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold truncate">{props.guest.name}</h5>
            <div className="grid grid-cols-2 gap-2">
                <QrModal dataUrl={props.dataUrl} name={props.guest.name} />
                <QrDownload dataUrl={props.dataUrl} name={props.guest.name.replace(' ', '_')} />
            </div>
        </div>
    </Card>
}