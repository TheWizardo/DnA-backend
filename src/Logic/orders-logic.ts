import dal from "../Utils/dal";
import { ForbiddenError, IdNotFound, ServiceError, UnauthorizedError, ValidationError } from "../Models/errors-models";
import OrderModel from "../Models/order-model";
import config from "../Utils/config";
import mailService from "../Services/mailService";
import { v4 as uuid } from 'uuid';

async function getAllOrders(): Promise<OrderModel[]> {
    const raw_text = await dal.readString(config.ordersEndpoint);
    return JSON.parse(raw_text) as OrderModel[];
}

async function getOrderById(order_number: string): Promise<OrderModel> {
    const allOrders = await getAllOrders();
    const orders = allOrders.filter(o => o.order_number === order_number);
    if (orders.length === 0) {
        throw new IdNotFound(order_number, "OrdersLogic-getOrderById");
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
    if (error) throw new ValidationError(error, "OrdersLogic-updateOrder");

    const allOrders = await getAllOrders();
    const allOrdersBut = allOrders.filter(o => o.order_number !== order.order_number);
    // making sure we have that order
    if (allOrders.length === allOrdersBut.length) {
        throw new IdNotFound(order.order_number, "OrdersLogic-updateOrder");
    }
    allOrdersBut.push(order);
    await dal.writeFile(config.ordersEndpoint, JSON.stringify(allOrdersBut))
    return order;
}

function generateUuid(): string {
    // Divide the UUID into 4 equal parts
    const id = uuid();
    const parts = [
        id.substring(0, 8),
        id.substring(8, 16),
        id.substring(16, 24),
        id.substring(24)
    ];

    // Initialize an empty string
    let transformedUuid: string = "";

    // Iterate over each char position
    for (let i = 0; i < 8; i++) {
        // Initialize a variable to store the sum of character codes
        let sum = 0;

        // Sum the character codes of all parts
        for (let j = 0; j < 4; j++) {
            sum += parts[j].charCodeAt(i);
        }

        // Take modulo 10 to get a number
        let transformedCharCode = sum % 10;
        transformedCharCode += 0x30;

        // Convert the character code to its corresponding character
        const transformedChar = String.fromCharCode(transformedCharCode);

        // add the transformed character
        transformedUuid += transformedChar;
    }

    return transformedUuid;

}

async function newOrder(order: OrderModel): Promise<OrderModel> {
    order.order_number = generateUuid();
    // verifying given destination
    const error = order.validate();
    if (error) throw new ValidationError(error, "OrdersLogic-newOrder");

    const allOrders = await getAllOrders();
    const filtered = allOrders.filter(o => o.order_number === order.order_number);
    // making sure we have that order
    if (filtered.length > 0) {
        throw new ForbiddenError("Cannot have multiple orders with the same Id", "OrdersLogic-newOrder");
    }
    await mailService.sendPurchaseEmail(order);
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