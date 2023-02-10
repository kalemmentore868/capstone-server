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
exports.deleteCartItem = exports.updateCartItem = exports.addCartItem = exports.getCartItems = void 0;
var CartModel_1 = __importDefault(require("../models/CartModel"));
var ProductModel_1 = __importDefault(require("../models/ProductModel"));
var getCartItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, cart, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, CartModel_1.default.findOne({ userId: userId })];
            case 2:
                cart = _a.sent();
                if (cart && cart.items.length > 0) {
                    res.send(cart);
                }
                else {
                    res.send(null);
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(500).send("Something went wrong");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCartItems = getCartItems;
var addCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, productId, quantity, cart, item, price, name, itemIndex, productItem, newCart, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.id;
                _a = req.body, productId = _a.productId, quantity = _a.quantity;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, CartModel_1.default.findOne({ userId: userId })];
            case 2:
                cart = _b.sent();
                return [4 /*yield*/, ProductModel_1.default.findOne({ _id: productId })];
            case 3:
                item = _b.sent();
                price = 0;
                name = "item not found";
                if (!item) {
                    res.status(404).send("Item not found!");
                }
                else {
                    price = item.price;
                    name = item.title;
                }
                if (!cart) return [3 /*break*/, 5];
                itemIndex = cart.items.findIndex(function (p) { return p.productId == productId; });
                // Check if product exists or not
                if (itemIndex > -1) {
                    productItem = cart.items[itemIndex];
                    productItem.quantity += quantity;
                    cart.items[itemIndex] = productItem;
                }
                else {
                    cart.items.push({
                        productId: productId,
                        name: name,
                        quantity: quantity,
                        price: price,
                        img_url: item === null || item === void 0 ? void 0 : item.img_url,
                    });
                }
                cart.bill += quantity * price;
                return [4 /*yield*/, cart.save()];
            case 4:
                cart = _b.sent();
                return [2 /*return*/, res.status(201).send(cart)];
            case 5: return [4 /*yield*/, CartModel_1.default.create({
                    userId: userId,
                    items: [{ productId: productId, name: name, quantity: quantity, price: price, img_url: item === null || item === void 0 ? void 0 : item.img_url }],
                    bill: quantity * price,
                })];
            case 6:
                newCart = _b.sent();
                return [2 /*return*/, res.status(201).send(newCart)];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_2 = _b.sent();
                console.log(err_2);
                res.status(500).send("Something went wrong");
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.addCartItem = addCartItem;
var updateCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, productId, qty, cart, item, itemIndex, productItem, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.id;
                _a = req.body, productId = _a.productId, qty = _a.qty;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, CartModel_1.default.findOne({ userId: userId })];
            case 2:
                cart = _b.sent();
                return [4 /*yield*/, ProductModel_1.default.findOne({ _id: productId })];
            case 3:
                item = _b.sent();
                if (!item)
                    return [2 /*return*/, res.status(404).send("Item not found!")]; // not returning will continue further execution of code.
                if (!!cart) return [3 /*break*/, 4];
                return [2 /*return*/, res.status(400).send("Cart not found")];
            case 4:
                itemIndex = cart.items.findIndex(function (p) { return p.productId == productId; });
                // Check if product exists or not
                if (itemIndex == -1)
                    return [2 /*return*/, res.status(404).send("Item not found in cart!")];
                else {
                    productItem = cart.items[itemIndex];
                    productItem.quantity = qty;
                    productItem.img_url = item === null || item === void 0 ? void 0 : item.img_url;
                    cart.items[itemIndex] = productItem;
                }
                cart.bill = cart.items.reduce(
                //@ts-ignore
                function (sum, item) { return sum + item.price * item.quantity; }, 0);
                return [4 /*yield*/, cart.save()];
            case 5:
                cart = _b.sent();
                return [2 /*return*/, res.status(201).send(cart)];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_3 = _b.sent();
                // just printing the error wont help us find where is the error. Add some understandable string to it.
                console.log("Error in update cart", err_3);
                res.status(500).send("Something went wrong");
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateCartItem = updateCartItem;
var deleteCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, productId, cart, itemIndex, productItem, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                productId = req.params.itemId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, CartModel_1.default.findOne({ userId: userId })];
            case 2:
                cart = _a.sent();
                if (!cart) return [3 /*break*/, 4];
                itemIndex = cart.items.findIndex(function (p) { return p.productId == productId; });
                if (itemIndex > -1) {
                    productItem = cart.items[itemIndex];
                    if (productItem) {
                        //@ts-ignore
                        cart.bill -= productItem.quantity * productItem.price;
                        cart.items.splice(itemIndex, 1);
                    }
                    else
                        console.log("cart item not found");
                }
                else
                    console.log("cart not found");
                return [4 /*yield*/, cart.save()];
            case 3:
                cart = _a.sent();
                return [2 /*return*/, res.status(201).send(cart)];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                console.log(err_4);
                res.status(500).send("Something went wrong");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteCartItem = deleteCartItem;
