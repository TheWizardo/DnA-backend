import dal from "../Utils/dal";
import { ValidationError } from "../Models/errors-models";
import config from "../Utils/config";
import FrontendConfig from "../Models/frontendConfig-model";
import mailService from "../Services/mailService";
import ContactModel from "../Models/contact-model";

async function getConfig(): Promise<FrontendConfig> {
    const raw_text = await dal.readString(config.frontendEndpoint);
    const conf: FrontendConfig = JSON.parse(raw_text);
    return conf;
}

async function updateConfig(newConf: FrontendConfig): Promise<FrontendConfig> {
    const error = newConf.validate();
    if (error) throw new ValidationError(error, "ConfigLogic-UpdateConfig");

    const currConf = await getConfig();
    await mailService.sendContactEmail(new ContactModel({
        reply_to: "noone@abc.xyz",
        from_name: "Yours truely",
        subject: "confBackup",
        message: JSON.stringify(currConf),
        validate: () => ""
    }));

    await dal.writeFile(config.frontendEndpoint, JSON.stringify(newConf));
    return newConf;
}



export default {
    getConfig,
    updateConfig
};