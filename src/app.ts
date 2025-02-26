import express from 'express';
import catchAll from './Middleware/catch-all';
import routeNotFound from './Middleware/route-not-found';
import authController from './Controllers/auth-controller';
import imagesController from './Controllers/images-controller';
import couponsController from './Controllers/coupons-controller';
import contactController from './Controllers/contact-controller';
import ordersController from './Controllers/orders-controller';
import configController from './Controllers/config-controller';
import expressRateLimit from 'express-rate-limit';
import cors from 'cors';
import logger from './Middleware/logger-mw';
import config from './Utils/config';
import sanitize from './Middleware/sanitize';
import http from 'http';

const server = express();

server.use(cors());
server.use("/", expressRateLimit({ windowMs: 500, max: 20, message: "Please try again later" }));

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

const httpServer = http.createServer(server).listen(config.port, () => console.log(`Listening on port ${config.port}`));

function shutdown() {
    console.log('Received kill signal, shutting down gracefully...');
    httpServer.close(() => {
        console.log('Closed out remaining connections.');
        process.exit(0);
    });

    // If after 5 seconds it still hasn't exited, force it
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 5000);
}

// Listen for TERM signal (e.g., Docker stop)
process.on('SIGTERM', shutdown);
