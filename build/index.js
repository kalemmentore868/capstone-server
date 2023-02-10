"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
var productRoutes_1 = __importDefault(require("./routes/productRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
var orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
var expressError_1 = require("./helpers/expressError");
var auth_1 = require("./middleware/auth");
var app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect("mongodb+srv://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@cluster0.vdzofgq.mongodb.net/?retryWrites=true&w=majority"))
    .then(function () {
    console.log("Mongo connection open");
})
    .catch(function (err) {
    console.log("error");
    console.log(err);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(auth_1.authenticateJWT);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/cart", cartRoutes_1.default);
app.use("/api/order", orderRoutes_1.default);
app.use(function (req, res, next) {
    throw new expressError_1.NotFoundError();
});
app.use(function (err, req, res, next) {
    var status = err.status || 500;
    var message = err.message;
    return res.status(status).json({
        error: { message: message, status: status },
    });
});
app.listen(process.env.PORT, function () {
    console.log("API is up and running on Port ".concat(process.env.PORT));
});
