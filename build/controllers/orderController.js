"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = exports.getOrders = exports.getAllOrdersInDb = void 0;
var CArtItemModel_1 = __importDefault(require("../models/CArtItemModel"));
var CartModel_1 = __importDefault(require("../models/CartModel"));
var OrderItemModel_1 = __importDefault(require("../models/OrderItemModel"));
var OrderModel_1 = __importDefault(require("../models/OrderModel"));
var UserModel_1 = __importDefault(require("../models/UserModel"));
var formatOrderEmail_1 = require("../helpers/formatOrderEmail");
var sendEmail_1 = require("../helpers/sendEmail");
var orderHelper_1 = require("../helpers/orderHelper");
var getAllOrdersInDb = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, listOfOrderObj, _i, orders_1, order, orderItems, orderObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, OrderModel_1.default.getAllOrders()];
            case 1:
                orders = _a.sent();
                if (!(orders.length <= 0)) return [3 /*break*/, 2];
                res.json({
                    message: "No orders",
                });
                return [3 /*break*/, 8];
            case 2:
                listOfOrderObj = [];
                _i = 0, orders_1 = orders;
                _a.label = 3;
            case 3:
                if (!(_i < orders_1.length)) return [3 /*break*/, 7];
                order = orders_1[_i];
                return [4 /*yield*/, OrderItemModel_1.default.getAllItemsFromOrder(order.id)];
            case 4:
                orderItems = _a.sent();
                return [4 /*yield*/, (0, orderHelper_1.getOrderObj)(orderItems, order.created_at, order.id)];
            case 5:
                orderObj = _a.sent();
                listOfOrderObj.push(orderObj);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7:
                if (listOfOrderObj.length <= 0) {
                    res.json({
                        message: "No orders",
                    });
                }
                else {
                    res.json({
                        message: "a list of all ordered items and total",
                        data: listOfOrderObj,
                    });
                }
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getAllOrdersInDb = getAllOrdersInDb;
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, orders, listOfOrderObj, _i, orders_2, order, orderItems, orderObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.params.id);
                return [4 /*yield*/, OrderModel_1.default.getAllUsersOrders(userId)];
            case 1:
                orders = _a.sent();
                if (!(orders.length <= 0)) return [3 /*break*/, 2];
                res.json({
                    message: "No orders",
                });
                return [3 /*break*/, 8];
            case 2:
                listOfOrderObj = [];
                _i = 0, orders_2 = orders;
                _a.label = 3;
            case 3:
                if (!(_i < orders_2.length)) return [3 /*break*/, 7];
                order = orders_2[_i];
                return [4 /*yield*/, OrderItemModel_1.default.getAllItemsFromOrder(order.id)];
            case 4:
                orderItems = _a.sent();
                return [4 /*yield*/, (0, orderHelper_1.getOrderObj)(orderItems, order.created_at, order.id)];
            case 5:
                orderObj = _a.sent();
                listOfOrderObj.push(orderObj);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7:
                if (listOfOrderObj.length <= 0) {
                    res.json({
                        message: "No orders",
                    });
                }
                else {
                    res.json({
                        message: "a list of all ordered items and total",
                        data: listOfOrderObj,
                    });
                }
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
var checkout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, notes, address, cart, user, email, cartItems, orderObj, order, i, cartItem, orderedItems, subject, text, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 14, , 15]);
                userId = parseInt(req.params.id);
                notes = req.body.notes;
                address = req.body.address;
                return [4 /*yield*/, CartModel_1.default.getCartByUserId(userId)];
            case 1:
                cart = _a.sent();
                return [4 /*yield*/, UserModel_1.default.getUser(userId)];
            case 2:
                user = _a.sent();
                email = user.email;
                if (!cart) return [3 /*break*/, 12];
                return [4 /*yield*/, CArtItemModel_1.default.getAllCartItemsInCart(cart.id)];
            case 3:
                cartItems = _a.sent();
                orderObj = {
                    user_id: userId,
                    total: cart.total,
                    notes: notes,
                };
                return [4 /*yield*/, OrderModel_1.default.createOrder(orderObj)];
            case 4:
                order = _a.sent();
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < cartItems.length)) return [3 /*break*/, 9];
                cartItem = cartItems[i];
                return [4 /*yield*/, OrderItemModel_1.default.createOrderItem(order.id, cartItem.product_id, cartItem.quantity)];
            case 6:
                _a.sent();
                return [4 /*yield*/, CArtItemModel_1.default.deleteCartItem(cartItem.id)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 5];
            case 9: return [4 /*yield*/, (0, formatOrderEmail_1.getOrdersAsString)(order.id)];
            case 10:
                orderedItems = _a.sent();
                subject = "Order made #".concat(order.id);
                text = "Thank you for your order. Here is the order details: ".concat(orderedItems, "\n      notes: ").concat(notes, "\n      address: #").concat(address.house_number, ", ").concat(address.street, ", ").concat(address.city, "\n");
                (0, sendEmail_1.sendEmail)(email, subject, text);
                return [4 /*yield*/, CartModel_1.default.deleteCart(cart.id)];
            case 11:
                _a.sent();
                return [2 /*return*/, res.status(201).json({ message: "Order made" })];
            case 12:
                res.status(500).send("You do not have items in cart");
                _a.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(500).send("Something went wrong");
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.checkout = checkout;
