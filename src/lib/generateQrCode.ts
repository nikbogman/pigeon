import qr from "qrcode";
import { env } from "../env/client.mjs";

export default async function generateQrCode(id: string) {
    return qr.toDataURL(`${env.NEXT_PUBLIC_URL}guests/${id}`, { width: 200, margin: 1 });
}