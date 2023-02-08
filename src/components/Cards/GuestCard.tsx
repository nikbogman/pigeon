import type { Guest } from "@prisma/client";
import { Card } from "flowbite-react";
import QrDownload from "../QrDownload";
import ViewLinksModal from "../Modals/ViewLinksModal";

const GuestCard: React.FC<{
    guest: Guest;
    dataUrl: string;
}> = (props) => <Card
    horizontal={true}
    className={`mx-2 my-1 border-${props.guest.attending ? 'green' : 'red'}-500`}
>
    <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold truncate">{props.guest.name}</h5>
        <div className="grid grid-cols-2 gap-1">
            <ViewLinksModal dataUrl={props.dataUrl} name={props.guest.name} />
            <QrDownload dataUrl={props.dataUrl} name={props.guest.name.replace(' ', '_')} />
        </div>
    </div>
</Card>

export default GuestCard;