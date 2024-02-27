import path from "path";

class Config {
    public environment = process.env.NODE_ENV; //"development" || "production";
    public port = +process.env.PORT || 3001;
    public dataFolder = path.resolve(__dirname, "..", "Assets", "data");
    public imagesFolder = path.resolve(__dirname, "..", "Assets", "images");
    public ordersEndpoint = this.dataFolder + "/orders.json";
    public couponsEndpoint = this.dataFolder + "/coupons.json";
    public usersEndpoint = this.dataFolder + "/users.json";

    public EmailJs = "https://api.emailjs.com/api/v1.0/email/send";
    public EmailJsUserId = "OEjoskM3upjjVzDsH";
    public EmailJsServiceId = "demons-and-angels";
    public EmailJsContactTemplateId = "template_cfhtu6q";
    public EmailJsPurchaseTemplateId = "template_dw1mwas";
}

const config = new Config();
export default config;