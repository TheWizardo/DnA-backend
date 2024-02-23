import path from "path";

class Config {
    public environment = "development";
    // public environment = "production";
    public port = +process.env.PORT || 3001;
    public dataFolder = path.resolve(__dirname, "..", "Assets", "data");
    public imagesFolder = path.resolve(__dirname, "..", "Assets", "images");
    public ordersEndpoint = this.dataFolder + "\\orders.json";
    public couponsEndpoint = this.dataFolder + "\\coupons.json";
    public usersEndpoint = this.dataFolder + "\\users.json";
}

const config = new Config();
export default config;