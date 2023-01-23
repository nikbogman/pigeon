import { ObjectId } from "mongodb";

export interface IInvitation {
    createdBy: ObjectId;
    title: string;
    description: string;
    date: Date;
    guests: IGuest[]
}

interface IGuest {
    name: string;
    attending: boolean;
}

// use zod over mongoose