import qr from "qrcode";

export default async function generateQrCode() {
    return qr.toDataURL("https://railway.app/pricing", { width: 200, margin: 1 });
}