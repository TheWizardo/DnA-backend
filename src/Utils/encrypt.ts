import crypto from "crypto";
import RSA from "node-rsa";
import { ForbiddenError } from "../Models/errors-models";

const salt = "YellowBrickRoad";
const key = new RSA({ b: 512 });
const publicKey = new RSA("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALxfysYh0X/jP08OTeExIdT1n4BPTjkGycQ+FFq7cRmJziv3TjVvnVj7nXqAVqhDS5KTJHzTnc44lnoYP9h2FicCAwEAAQ==", "public");

function sha256(plainText: string) {
    if (!plainText) return null;
    return crypto.createHmac("sha256", salt).update(plainText).digest("hex");
}

function rsaEncrypt(plainText: string): string {
    if (!plainText) return null;
    return publicKey.encrypt(plainText, "base64");
}

function rsaDecrypt(cipherText: string, key: string): string {
    try {
        const privateKey = new RSA(key, "private");
        if (!cipherText) return null;
        return privateKey.decrypt(cipherText, "utf8");
    }
    catch (e: any) {
        console.log(e)
        console.log("incorrect key");
        // throw new ForbiddenError("Forbidden");
    }
}

export default { sha256, rsaEncrypt, rsaDecrypt };