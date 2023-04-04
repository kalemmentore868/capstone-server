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
exports.seedCategories = void 0;
var CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
var ProductModel_1 = __importDefault(require("../models/ProductModel"));
var categoryTitles = [
    "Fresh produce",
    "Dairy and Eggs",
    "Bakery",
    "Meat",
    "Snacks",
    "Beverages",
    "Frozen Foods",
    "Fast Foods",
    "Household Essentials",
];
var categoryDescriptions = [
    "Fruits, vegetables, herbs, and other fresh produce items that customers can order for delivery.",
    "Milk, cheese, butter, eggs, and other dairy products.",
    "Bread, bagels, croissants, pastries, cakes, and other baked goods.",
    "Chicken, beef, pork, fish, shrimp, and other types of meat and seafood.",
    " Chips, cookies, candy, chocolates, and other snacks and treats.",
    " Water, soda, juice, tea, coffee, and other beverages.",
    "Frozen meals, ice cream, vegetables, and other frozen items that customers can order.",
    "Burgers, fries, pizza, tacos, and other fast food items that customers can order for delivery.",
    "Paper products, cleaning supplies, and other household essentials that customers can add to their order.",
];
var categoryThumbnails = [
    "https://images.unsplash.com/photo-1489450278009-822e9be04dff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZyZXNoJTIwcHJvZHVjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1630356090105-808ba2fe97f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGFpcnklMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFrZXJ5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1591510669755-5e6dbb1ca33d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVhdCUyMHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1607977027972-e2aae2b5b1e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNuYWNrJTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1625865019845-7b2c89b8a8a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmV2ZXJhZ2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1601599967100-f16100982063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJvemVuJTIwZm9vZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1615996001375-c7ef13294436?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzdCUyMGZvb2RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNsZWFuaW5nJTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
];
var seedCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, categoryObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProductModel_1.default.deleteAllProducts()];
            case 1:
                _a.sent();
                return [4 /*yield*/, CategoryModel_1.default.deleteAllCategories()];
            case 2:
                _a.sent();
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < categoryTitles.length)) return [3 /*break*/, 6];
                categoryObj = {
                    title: categoryTitles[i],
                    description: categoryDescriptions[i],
                    thumbnail: categoryThumbnails[i],
                };
                // @ts-ignore
                return [4 /*yield*/, CategoryModel_1.default.createCategory(categoryObj)];
            case 4:
                // @ts-ignore
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.seedCategories = seedCategories;
