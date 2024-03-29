import UserModel from "../Models/user-model";
import jwt from "jsonwebtoken";

const secretKey = "LionsAndTigersAndBears";

function generateNewToken(user: UserModel): string {
    const container = { user };
    // signing a new token for the given user
    const token = jwt.sign(container, secretKey, { expiresIn: "30m" });
    return token;
}

function verifyToken(authHeader: string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        try {
            // request doesn't include token
            if (!authHeader) {
                res(false);
                return;
            }
            // getting only the token => 'Bearer XXXX...'
            const token = authHeader.substring(7);
            if (!token) {
                res(false);
                return;
            }

            // verifying token is correct and valid 
            jwt.verify(token, secretKey, err => {
                if (err) {
                    res(false);
                    return;
                }
                res(true);
                return;
            })
        }
        catch (err: any) {
            rej(err);
        }
    });
}

function getUserRoleFromToken(authHeader: string): string {
    if (!authHeader) return;
    const token = authHeader.substring(7);
    // extracting user from token
    const container = jwt.decode(token) as { user: UserModel };
    const user = container.user;
    return user.role;
}

export default { generateNewToken, verifyToken, getUserRoleFromToken };