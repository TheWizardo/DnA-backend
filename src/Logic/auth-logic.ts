import dal from "../Utils/dal";
import encrypt from "../Utils/encrypt";
import auth from "../Utils/auth";
import { UnauthorizedError, ValidationError } from "../Models/client-errors";
import UserModel from "../Models/user-model";
import CredentialsModel from "../Models/credentials-model";
import config from "../Utils/config";

async function login(creds: CredentialsModel): Promise<string> {
    const error = creds.validate();
    if (error) throw new ValidationError(error);

    const raw_text = await dal.readString(config.usersEndpoint);
    const allUsers: UserModel[] = JSON.parse(raw_text);
    creds.password = encrypt.sha256(creds.password);
    const users = allUsers.filter(u => u.password === creds.password && u.username === creds.username);
    if (users.length < 1) throw new UnauthorizedError("Incorrect username or password");
    const user = new UserModel(users[0]);
    // augmenting the user object
    delete user.password;
    // generating token
    const token = auth.generateNewToken(user);
    return token;
}

export default {
    login
};