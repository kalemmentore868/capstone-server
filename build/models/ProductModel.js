"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img_url: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date_added: {
        type: Date,
        default: Date.now,
    },
});
var ProductModel = mongoose_1.default.model("products", productSchema);
exports.default = ProductModel;
