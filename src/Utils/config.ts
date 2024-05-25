import path from "path";

class Config {
    public environment = process.env.NODE_ENV; //"development" || "production";
    public httpsPort = +process.env.HTTPS_PORT || 4272;
    public httpPort = +process.env.HTTP_PORT || 8080;

    public dataFolder = path.resolve(__dirname, "..", "Assets", "data");
    public imagesFolder = path.resolve(__dirname, "..", "Assets", "images");
    public ordersEndpoint = this.dataFolder + "/orders.json";
    public couponsEndpoint = this.dataFolder + "/coupons.json";
    public usersEndpoint = this.dataFolder + "/users.json";
    public frontendEndpoint = this.dataFolder + "/frontendConfig.json";
    public publicKey =  path.resolve(__dirname, "..", "Assets", "Key", "publicKey.pem");

    public certFilesPath = "/etc/letsencrypt/live/api.demonsandangels.co.il/";

    public EmailJs = "https://api.emailjs.com/api/v1.0/email/send";
    public EmailJsUserId = "H9rn7GTghDk4HNmXP";
    public EmailJsServiceId = "service_ktckf8a";
    public EmailJsContactTemplateId = "template_8d6mkgg";
    public EmailJsPurchaseTemplateId = "template_0gmbv7p";
}

const config = new Config();
export default config;