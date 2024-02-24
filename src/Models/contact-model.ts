import Joi from "joi";

export default class ContactModel {
    public from_name: string = "";
    public subject: string = "";
    public message: string = "";
    public reply_to: string = "";

    public constructor(contact: ContactModel) {
        this.from_name = contact.from_name;
        this.subject = contact.subject;
        this.message = contact.message;
        this.reply_to = contact.reply_to;
    }

    private static validationScheme = Joi.object({
        from_name: Joi.string().required().min(2).max(50),
        subject: Joi.string().required().min(2).max(50),
        reply_to: Joi.string().email().required(),
        message: Joi.string().required()
    });

    public validate(): string {
        const result = ContactModel.validationScheme.validate(this);
        return result.error?.message;
    }
}