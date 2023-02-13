import qr from "qrcode";
import { env } from "../env/server.mjs";

export default async function generateQrCode(id: string) {
    return qr.toDataURL(`${env.NEXTAUTH_URL}guests/${id}`, { width: 200, margin: 1 });
}