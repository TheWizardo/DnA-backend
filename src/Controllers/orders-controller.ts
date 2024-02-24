import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import ordersLogic from '../Logic/orders-logic';
import OrderModel from '../Models/order-model';

const router = express.Router();

router.get("/orders", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allOrders = await ordersLogic.getAllOrders();
        res.json(allOrders);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/orders/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await ordersLogic.getOrderById(req.params.id);
        res.json(order);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/orders", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.price = +req.body.price;
        req.body.amount = +req.body.amount;
        req.body.street_num = req.body?.street_num ? +req.body?.street_num : undefined;
        req.body.apartment = req.body?.apartment ? +req.body?.apartment : undefined;
        req.body.dedicate = req.body?.dedicate === "true" ? true : false;
        req.body.for_self = req.body?.for_self === "true" ? true : false;

        const order = new OrderModel(req.body);
        const addedOrder = await ordersLogic.newOrder(order);
        res.status(201).json(addedOrder);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/orders/search/:phone", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await ordersLogic.getOrderByPhone(req.params.phone);
        res.json(order);
    }
    catch (err: any) {
        next(err);
    }
});

// router.put("/orders/:id", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         req.body.price = +req.body.price;
//         req.body.amount = +req.body.amount;
//         req.body.street_num = req.body?.street_num ? +req.body?.street_num : undefined;
//         req.body.apartment = req.body?.apartment ? +req.body?.apartment : undefined;
//         req.body.dedicate = req.body?.dedicate === "true" ? true : false;
//         req.body.for_self = req.body?.for_self === "true" ? true : false;
//
//         const order = new OrderModel(req.body);
//         const updatedOrder = await ordersLogic.updateOrder(order);
//         res.json(updatedOrder);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

router.put("/orders/:id", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(await ordersLogic.getOrderById(req.params.id));
        order.tracking_number = req.body.tracking_number;
        const updatedOrder = await ordersLogic.updateOrder(order);
        res.json(updatedOrder);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;