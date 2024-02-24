import axios, { AxiosResponse } from 'axios';
import ContactModel from "../Models/contact-model";
import OrderModel from "../Models/order-model";
import config from '../Utils/config';

type EmailJS<T> = { service_id: string, template_id: string, template_params: T, user_id: string };

class MailService {
    public async sendContactEmail(contact: ContactModel): Promise<boolean> {
        return await this.sendEmail<ContactModel>(contact, config.EmailJsContactTemplateId);
    }

    public async sendPurchaseEmail(order: OrderModel): Promise<boolean> {
        return await this.sendEmail<OrderModel>(order, config.EmailJsPurchaseTemplateId);
    }

    private async sendEmail<T>(object: T, template: string): Promise<boolean> {
        try {
            const result: AxiosResponse = await axios.post<EmailJS<T>>(config.EmailJs,
                { service_id: config.EmailJsServiceId, template_id: template, template_params: object, user_id: config.EmailJsUserId });
            return result.status === 200;
        }
        catch (error: any) {
            return false;
        }
    }
}

const mailService = new MailService();
export default mailService;