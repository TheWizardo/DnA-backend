import dal from "../Utils/dal";
import { ForbiddenError, IdNotFound, ServiceError, UnauthorizedError, ValidationError } from "../Models/errors-models";
import OrderModel from "../Models/order-model";
import config from "../Utils/config";
import mailService from "../Services/mailService";

async function getAllOrders(): Promise<OrderModel[]> {
    const raw_text = await dal.readString(config.ordersEndpoint);
    return JSON.parse(raw_text) as OrderModel[];
}

async function getOrderById(id: string): Promise<OrderModel> {
    const allOrders = await getAllOrders();
    const orders = allOrders.filter(o => o.id === id);
    if (orders.length === 0) {
        throw new IdNotFound(id);
    }
    return orders[0];
}

async function getOrderByPhone(phoneNum: string): Promise<OrderModel[]> {
    const allOrders = await getAllOrders();
    const orders = allOrders.filter(o => o.phone === phoneNum);
    return orders;
}

async function updateOrder(order: OrderModel): Promise<OrderModel> {
    // verifying given destination
    const error = order.validate();
    if (error) throw new ValidationError(error);

    const allOrders = await getAllOrders();
    const allOrdersBut = allOrders.filter(o => o.id !== order.id);
    // making sure we have that order
    if (allOrders.length === allOrdersBut.length) {
        throw new IdNotFound(order.id);
    }
    allOrdersBut.push(order);
    await dal.writeFile(config.ordersEndpoint, JSON.stringify(allOrdersBut))
    return order;
}

async function newOrder(order: OrderModel): Promise<OrderModel> {
    // verifying given destination
    const error = order.validate();
    if (error) throw new ValidationError(error);

    const allOrders = await getAllOrders();
    const filtered = allOrders.filter(o => o.id === order.id);
    // making sure we have that order
    if (filtered.length > 0) {
        throw new ForbiddenError("Cannot have multiple orders with the same Id");
    }
    const success = await mailService.sendPurchaseEmail(order);
    if (!success) throw new ServiceError("Failed to contact server.");
    allOrders.push(order);
    await dal.writeFile(config.ordersEndpoint, JSON.stringify(allOrders))
    return order;
}

export default {
    getAllOrders,
    getOrderById,
    getOrderByPhone,
    updateOrder,
    newOrder
};