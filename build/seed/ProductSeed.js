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
exports.seedProducts = void 0;
var CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
var ProductModel_1 = __importDefault(require("../models/ProductModel"));
var productTitles = [
    "cheese",
    "eggs",
    "sausage",
    "case of water",
    "macaroni",
    "chicken",
    "kool kids",
    "coca-cola",
    "apples",
    "seasoning",
    "butter",
    "milk",
    "cereal",
    "bread",
];
var productDesc = [
    "Cheese - A dairy product made from milk that is typically yellow or white in color and has a tangy, sharp, or mild flavor. It is used in a variety of dishes, including sandwiches, pizza, and pasta.",
    "Eggs - A food product produced by birds, typically hens. They are used in a variety of dishes, including breakfast foods, baked goods, and desserts.",
    "Sausage - A meat product made from ground meat, often pork, and spices. It can be served in a variety of ways, such as grilled, fried, or baked, and is often used as a breakfast food.",
    "Case of Water - A package of bottled water typically containing multiple individual bottles, used for drinking and hydration.",
    "Macaroni - A type of pasta with a small, curved shape. It is often used in pasta dishes, such as macaroni and cheese.",
    "Chicken - A type of poultry often used in cooking, with white or dark meat, which can be prepared in a variety of ways, including grilling, baking, and frying.",
    "Case of Kool Kids - a popular juice",
    "Case of Coca-Cola - A popular carbonated soft drink, typically packaged in cans or bottles.",
    "Apples - A fruit with a crisp texture and sweet or tart flavor. It can be eaten fresh or used in a variety of dishes, such as pies and salads.",
    "Seasoning - A mixture of spices and herbs used to enhance the flavor of food. Common seasonings include salt, pepper, garlic powder, and paprika.",
    "Butter - A dairy product made from milk or cream that is typically used in cooking and baking.",
    "Milk - A dairy product produced by mammals, typically cows. It is used in a variety of foods and beverages, such as cereal, coffee, and smoothies.",
    "Cereal - A breakfast food made from grains, often eaten with milk. It comes in a variety of flavors and types, such as flakes, puffs, and granola.",
    "Bread - A baked food made from flour, water, and yeast or another leavening agent. It comes in a variety of types, such as white, wheat, and sourdough.",
];
var productPrices = [30, 22, 28, 25, 18, 20, 28, 30, 20, 20, 8, 12, 30, 18];
var productImgUrls = [
    "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNoZWVzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZWdnc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1621800973389-768626d38a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhdXNhZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ym90dGxlZCUyMHdhdGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1590060846796-0418842f3908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYXJvbml8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1590012040529-c5e12f37b5d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8anVpY2UlMjBib3h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29rZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1610397962076-02407a169a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2Vhc29uaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWlsa3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1504308805006-0f7a5f1f0f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VyZWFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
];
var categories = [
    "Dairy and Eggs",
    "Dairy and Eggs",
    "Meat",
    "Beverages",
    "Snacks",
    "Meat",
    "Beverages",
    "Beverages",
    "Fresh produce",
    "Fresh produce",
    "Dairy and Eggs",
    "Dairy and Eggs",
    "Snacks",
    "Bakery",
];
var seedProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, category, productObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < productTitles.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, CategoryModel_1.default.getCategoryByTitle(categories[i])];
            case 2:
                category = _a.sent();
                console.log(category);
                productObj = {
                    title: productTitles[i],
                    price: productPrices[i],
                    description: productDesc[i],
                    img_url: productImgUrls[i],
                    rating: 3,
                    is_best_seller: false,
                    seller_id: 2,
                    category_id: category.id,
                };
                return [4 /*yield*/, ProductModel_1.default.createProduct(productObj)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.seedProducts = seedProducts;
