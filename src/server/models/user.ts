// this is copy of Next-Auth MongoDB-adapter's user model
import { ObjectId } from "mongodb";
export interface IUser {
    name: string;
    email: string;
    image: string;
    emailVerified: Date | null;
    invitations: ObjectId[]
}

