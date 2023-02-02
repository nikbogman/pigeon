import {
    doc, addDoc, getDoc, getDocs, updateDoc, collection, query, where, getCountFromServer,
    DocumentData, DocumentSnapshot, QueryDocumentSnapshot,
    AddPrefixToKeys, FieldPath, WhereFilterOp,
} from "firebase/firestore";
import { db } from "../server/db";

const guestCollection = collection(db, "guests");

const byId = (id: string) => doc(db, "guests", id);

// add timestamp automatic formats
const format = (doc: DocumentSnapshot<DocumentData> | QueryDocumentSnapshot<DocumentData>): { id: string } & DocumentData => ({
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
    const q = query(guestCollection, where(fieldPath, opStr, value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => format(doc))
}

export async function findMany() {
    const snapshot = await getDocs(guestCollection);
    return snapshot.docs.map(doc => format(doc));
}

export async function create(data: any) {
    return addDoc(guestCollection, data);
}

export async function countWhere(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown) {
    const q = query(guestCollection, where(fieldPath, opStr, value));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
}