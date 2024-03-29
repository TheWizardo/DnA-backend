import { createHmac } from "crypto";
import { JSEncrypt } from 'nodejs-jsencrypt';
import fs from 'fs/promises';
import config from "../Utils/config";

class EncryptionService {
    private salt = "YellowBrickRoad";
    // const key = new RSA({ b: 512 });
    private publicKey;

    constructor() {
        (async () => await this.setKey())();
    }

    private async setKey() {
        const raw_key = await fs.readFile(config.publicKey, "utf-8");
        const stripedTags = raw_key.replace(/-----BEGIN [^\n]+-----/, '').replace(/-----END [^\n]+-----/, '').replace(/\s+/g, '');
        this.publicKey = new JSEncrypt()
        this.publicKey.setPublicKey(stripedTags);
    }

    public rsaEncrypt(plainText: string): string {
        if (!plainText) return null;
        const cipherText = this.publicKey.encrypt(plainText);
        if (typeof cipherText === "boolean") {
            throw new Error("couponService-rsaDecrypt");
        }
        if (cipherText === null) {
            throw new Error("couponService-rsaDecrypt could not decrypt");
        }
        return cipherText;
    }

    public sha256(plainText: string) {
        if (!plainText) return null;
        return createHmac("sha256", this.salt).update(plainText).digest("hex");
    }
}

const encryptionService = new EncryptionService();
export default encryptionService;