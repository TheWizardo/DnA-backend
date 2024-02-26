import crypto from "crypto";
import RSA from "node-rsa";
import { UnauthorizedError } from "../Models/errors-models";

class EncryptionService {
    private salt = "YellowBrickRoad";
    // const key = new RSA({ b: 512 });
    private publicKey = new RSA("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALxfysYh0X/jP08OTeExIdT1n4BPTjkGycQ+FFq7cRmJziv3TjVvnVj7nXqAVqhDS5KTJHzTnc44lnoYP9h2FicCAwEAAQ==", "public");

    public sha256(plainText: string) {
        if (!plainText) return null;
        return crypto.createHmac("sha256", this.salt).update(plainText).digest("hex");
    }

    public rsaEncrypt(plainText: string): string {
        if (!plainText) return null;
        return this.publicKey.encrypt(plainText, "base64");
    }

    public rsaDecrypt(cipherText: string, key: string): string {
        try {
            const privateKey = new RSA(key, "private");
            if (!cipherText) return null;
            return privateKey.decrypt(cipherText, "utf8");
        }
        catch (e: any) {
            throw new UnauthorizedError("Encryption failed", "EncryptionService-rsaDecrypt");
        }
    }
}

const encryptionService = new EncryptionService();
export default encryptionService;