import axios from 'axios';
import ContactModel from "../Models/contact-model";
import OrderModel from "../Models/order-model";
import config from '../Utils/config';
import { ServiceError } from '../Models/errors-models';

type EmailJS<T> = { service_id: string, template_id: string, template_params: T, user_id: string };

class MailService {
    public async sendContactEmail(contact: ContactModel): Promise<void> {
        await this.sendEmail<ContactModel>(contact, config.EmailJsContactTemplateId);
    }

    public async sendPurchaseEmail(order: OrderModel): Promise<void> {
        await this.sendEmail<OrderModel>(order, config.EmailJsPurchaseTemplateId);
    }

    private async sendEmail<T>(object: T, template: string): Promise<boolean> {
        try {
            await axios.post<EmailJS<T>>(config.EmailJs, {
                service_id: config.EmailJsServiceId,
                template_id: template,
                template_params: object,
                user_id: config.EmailJsUserId
            }, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Origin": "http://localhost:3000",
                    "Referer": "http://localhost:3000/",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "cross-site",
                    "DNT": "1",
                    "Sec-GPC": "1",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache",
                    "TE": "trailers"
                }
            });
            return;
        }
        catch (error: any) {
            throw new ServiceError("Failed to contact server.", "MailService-sendEmail");
        }
    }
}

const mailService = new MailService();
export default mailService;