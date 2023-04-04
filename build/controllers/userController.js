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
exports.deleteOneUser = exports.updateOneUser = exports.getOneUser = exports.getAllUsers = void 0;
var UserModel_1 = __importDefault(require("../models/UserModel"));
var expressError_1 = require("../helpers/expressError");
var userUpdateSchema_json_1 = __importDefault(require("../schemas/userUpdateSchema.json"));
var jsonSchemaHelper_1 = __importDefault(require("../helpers/jsonSchemaHelper"));
var jsonschema_1 = __importDefault(require("jsonschema"));
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var listOfUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.getAllUsers()];
            case 1:
                listOfUsers = _a.sent();
                res.json({
                    message: "A list of all the users",
                    data: listOfUsers,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getOneUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, UserModel_1.default.getUser(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new expressError_1.NotFoundError("User with id :".concat(id, " cannot be found"));
                }
                else {
                    res.json({
                        message: "User with id ".concat(id),
                        data: user,
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getOneUser = getOneUser;
var updateOneUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fetchedUser, validator, errs, userData, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, UserModel_1.default.getUser(id)];
            case 1:
                fetchedUser = _a.sent();
                if (!!fetchedUser) return [3 /*break*/, 2];
                res.status(404).json({
                    message: "User with id :".concat(id, " cannot be found"),
                });
                return [3 /*break*/, 4];
            case 2:
                validator = jsonschema_1.default.validate(req.body, userUpdateSchema_json_1.default);
                if (!validator.valid) {
                    errs = (0, jsonSchemaHelper_1.default)(validator.errors);
                    throw new expressError_1.BadRequestError(errs);
                }
                userData = {
                    first_name: req.body.first_name
                        ? req.body.first_name
                        : fetchedUser.first_name,
                    last_name: req.body.last_name
                        ? req.body.last_name
                        : fetchedUser.last_name,
                    phone_number: req.body.phone_number
                        ? req.body.phone_number
                        : fetchedUser.phone_number,
                };
                return [4 /*yield*/, UserModel_1.default.updateUser(userData, id)];
            case 3:
                user = (_a.sent()) || {
                    id: "not found",
                };
                res.json({
                    message: "User with id ".concat(user.id, " was updated"),
                    data: user,
                });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateOneUser = updateOneUser;
var deleteOneUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, UserModel_1.default.getUser(id)];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 2];
                res.status(404).json({
                    message: "User with id :".concat(id, " cannot be found"),
                });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, UserModel_1.default.deleteUser(id)];
            case 3:
                _a.sent();
                res.json({
                    message: "User with id ".concat(id, " was deleted"),
                });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteOneUser = deleteOneUser;
