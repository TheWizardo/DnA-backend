import express from 'express';
import catchAll from './Middleware/catch-all';
import routeNotFound from './Middleware/route-not-found';
import authController from './Controllers/auth-controller';
import imagesController from './Controllers/images-controller';
import couponsController from './Controllers/coupons-controller';
import contactController from './Controllers/contact-controller';
import ordersController from './Controllers/orders-controller';
import sslController from './Controllers/ssl-controller';
import configController from './Controllers/config-controller';
import expressRateLimit from 'express-rate-limit';
import cors from 'cors';
import logger from './Middleware/logger-mw';
import config from './Utils/config';
import sanitize from './Middleware/sanitize';
import https from 'https';
import http from 'http';
import fs from 'fs';

const server = express();
const sslChallenge = express()

server.use(cors());
sslChallenge.use(cors());
server.use("/", expressRateLimit({ windowMs: 500, max: 20, message: "Please try again later" }));
sslChallenge.use("/", expressRateLimit({ windowMs: 500, max: 20, message: "Please try again later" }));

server.use(express.json());
server.use(sanitize);
server.use(logger); ///////////////////////////////////////////////////////////////////////////////////////////////
server.use("/api/v1", authController);
server.use("/api/v1", imagesController);
server.use("/api/v1", couponsController);
server.use("/api/v1", contactController);
server.use("/api/v1", ordersController);
server.use("/api/v1", configController);
server.use("*", routeNotFound);
server.use(catchAll);

sslChallenge.use("/", sslController);
sslChallenge.use("*", routeNotFound);
sslChallenge.use(catchAll);

const sslCreds = {
    key: fs.readFileSync(`${config.certFilesPath}privkey.pem`, "utf-8"),
    cert: fs.readFileSync(`${config.certFilesPath}fullchain.pem`, "utf-8"),
}

https.createServer(sslCreds, server).listen(config.port, () => console.log(`Listening on port ${config.port}`));
http.createServer(sslChallenge).listen(58080, () => console.log(`Listening for the acme challenge`));