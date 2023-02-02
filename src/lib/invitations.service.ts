import {
    doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, collection, query, where,
    DocumentData, DocumentSnapshot, QueryDocumentSnapshot,
    AddPrefixToKeys, FieldPath, WhereFilterOp,
} from "firebase/firestore";
import { db } from "../server/db";

const invitationCollection = collection(db, "invitations");

const byId = (id: string) => doc(db, "invitations", id);

const format = (doc: DocumentSnapshot<DocumentData> | QueryDocumentSnapshot<DocumentData>): {
    id: string
} & DocumentData => ({
    id: doc.id, ...doc.data()
});

export async function findById(id: string) {
    const doc = await getDoc(byId(id));
    return format(doc);
}
export async function updateById(id: string, data: { [x: string]: any; } & AddPrefixToKeys<string, any>) {
    return updateDoc(byId(id), data);
}
export async function findManyWhere(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown) {
    const q = query(invitationCollection, where(fieldPath, opStr, value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => format(doc))
}
export async function create(data: any) {
    return addDoc(invitationCollection, data);
}

export async function deleteById(id: string) {
    return deleteDoc(byId(id));
}