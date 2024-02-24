import { ServiceError, ValidationError } from "../Models/errors-models";
import ContactModel from "../Models/contact-model";
import mailService from "../Services/mailService";

async function contact(contact: ContactModel): Promise<void> {
    const error = contact.validate();
    if (error) throw new ValidationError(error);

    const success = await mailService.sendContactEmail(contact);
    if (!success) throw new ServiceError("Failed to contact server.");
    return;
}

export default {
    contact
};