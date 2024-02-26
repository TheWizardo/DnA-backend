import { ServiceError, ValidationError } from "../Models/errors-models";
import ContactModel from "../Models/contact-model";
import mailService from "../Services/mailService";

async function contact(contact: ContactModel): Promise<void> {
    const error = contact.validate();
    if (error) throw new ValidationError(error, "ContactLogic-Contact");

    await mailService.sendContactEmail(contact);
    return;
}

export default {
    contact
};