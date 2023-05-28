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
var CartItemModel_1 = __importDefault(require("../models/CartItemModel"));
var cartHelpers_1 = require("../helpers/cartHelpers");
var getCartItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, cart, cartItems, cartObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.params.id);
                return [4 /*yield*/, CartModel_1.default.getCartByUserId(userId)];
            case 1:
                cart = _a.sent();
                if (!!cart) return [3 /*break*/, 2];
                res.json({
                    message: "No Items In Cart",
                });
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, CartItemModel_1.default.getAllCartItemsInCart(cart.id)];
            case 3:
                cartItems = _a.sent();
                if (!(cartItems.length <= 0)) return [3 /*break*/, 4];
                res.json({
                    message: "No Items In Cart",
                });
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, (0, cartHelpers_1.getCartObj)(cart.id, cart.user_id)];
            case 5:
                cartObj = _a.sent();
                res.json({
                    message: "a list of all Cart Items and total",
                    data: cartObj,
                });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getCartItems = getCartItems;
var addCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, quantity, productId, cart, product, total, newCart, cartObj, foundItem, qty, cartObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.params.id);
                quantity = parseInt(req.body.quantity);
                productId = parseInt(req.body.productId);
                return [4 /*yield*/, CartModel_1.default.getCartByUserId(userId)];
            case 1:
                cart = _a.sent();
                return [4 /*yield*/, ProductModel_1.default.getProduct(productId)];
            case 2:
                product = _a.sent();
                if (!product) {
                    res.status(404).json({
                        message: "Product with id: ".concat(productId, " cannot be found"),
                    });
                }
                if (!!cart) return [3 /*break*/, 6];
                total = product.price * quantity;
                return [4 /*yield*/, CartModel_1.default.createCart(userId, total)];
            case 3:
                newCart = _a.sent();
                return [4 /*yield*/, CartItemModel_1.default.createCartItem(newCart.id, productId, quantity)];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, cartHelpers_1.getCartObj)(newCart.id, newCart.user_id)];
            case 5:
                cartObj = _a.sent();
                res.json({
                    message: "a list of all Cart Items and total",
                    data: cartObj,
                });
                return [3 /*break*/, 14];
            case 6: return [4 /*yield*/, CartItemModel_1.default.getProductInCart(cart.id, productId)];
            case 7:
                foundItem = _a.sent();
                if (!foundItem) return [3 /*break*/, 9];
                qty = foundItem.quantity + quantity;
                return [4 /*yield*/, CartItemModel_1.default.updateCartItem(qty, foundItem.id)];
            case 8:
                _a.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, CartItemModel_1.default.createCartItem(cart.id, productId, quantity)];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [4 /*yield*/, (0, cartHelpers_1.getCartObj)(cart.id, cart.user_id)];
            case 12:
                cartObj = _a.sent();
                return [4 /*yield*/, CartModel_1.default.updateCartTotal(cartObj.bill, cart.id)];
            case 13:
                _a.sent();
                res.json({
                    message: "a list of all Cart Items and total",
                    data: cartObj,
                });
                _a.label = 14;
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.addCartItem = addCartItem;
var updateCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, productId, quantity, cart, product, foundItem, cartObj;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = parseInt(req.params.id);
                _a = req.body, productId = _a.productId, quantity = _a.quantity;
                return [4 /*yield*/, CartModel_1.default.getCartByUserId(userId)];
            case 1:
                cart = _b.sent();
                return [4 /*yield*/, ProductModel_1.default.getProduct(productId)];
            case 2:
                product = _b.sent();
                if (!product) {
                    res.status(404).json({
                        message: "Product with id: ".concat(productId, " cannot be found"),
                    });
                }
                if (!!cart) return [3 /*break*/, 3];
                res.status(404).json({
                    message: "Cart not found",
                });
                return [3 /*break*/, 10];
            case 3: return [4 /*yield*/, CartItemModel_1.default.getProductInCart(cart.id, productId)];
            case 4:
                foundItem = _b.sent();
                if (!foundItem) return [3 /*break*/, 6];
                return [4 /*yield*/, CartItemModel_1.default.updateCartItem(quantity, foundItem.id)];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                res.status(404).json({
                    message: "Item not found in Cart",
                });
                _b.label = 7;
            case 7: return [4 /*yield*/, (0, cartHelpers_1.getCartObj)(cart.id, cart.user_id)];
            case 8:
                cartObj = _b.sent();
                return [4 /*yield*/, CartModel_1.default.updateCartTotal(cartObj.bill, cart.id)];
            case 9:
                _b.sent();
                res.json({
                    message: "a list of all Cart Items and total",
                    data: cartObj,
                });
                _b.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.updateCartItem = updateCartItem;
var deleteCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, productId, cart, cartItem, cartObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.params.userId);
                productId = parseInt(req.params.itemId);
                return [4 /*yield*/, CartModel_1.default.getCartByUserId(userId)];
            case 1:
                cart = _a.sent();
                console.log(userId);
                if (!!cart) return [3 /*break*/, 2];
                res.status(404).json({
                    message: "Cart not found",
                });
                return [3 /*break*/, 9];
            case 2: return [4 /*yield*/, CartItemModel_1.default.getProductInCart(cart.id, productId)];
            case 3:
                cartItem = _a.sent();
                if (!!cartItem) return [3 /*break*/, 4];
                res.status(404).json({
                    message: "Item not found",
                });
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, CartItemModel_1.default.deleteCartItem(cartItem.id)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, (0, cartHelpers_1.getCartObj)(cart.id, cart.user_id)];
            case 7:
                cartObj = _a.sent();
                return [4 /*yield*/, CartModel_1.default.updateCartTotal(cartObj.bill, cart.id)];
            case 8:
                _a.sent();
                res.json({
                    message: "a list of all Cart Items and total",
                    data: cartObj,
                });
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.deleteCartItem = deleteCartItem;
