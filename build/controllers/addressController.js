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
exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.getAllAddressesByUser = exports.getSingleAddress = exports.getAllAddresses = void 0;
var AddressModel_1 = __importDefault(require("../models/AddressModel"));
var addressCreate_json_1 = __importDefault(require("../schemas/addressCreate.json"));
var addressUpdate_json_1 = __importDefault(require("../schemas/addressUpdate.json"));
var expressError_1 = require("../helpers/expressError");
var jsonSchemaHelper_1 = __importDefault(require("../helpers/jsonSchemaHelper"));
var jsonschema_1 = __importDefault(require("jsonschema"));
var UserModel_1 = __importDefault(require("../models/UserModel"));
var getAllAddresses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var listOfAddresses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, AddressModel_1.default.getAllAddresses()];
            case 1:
                listOfAddresses = _a.sent();
                res.json({
                    message: "A list of all addresses",
                    data: listOfAddresses,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllAddresses = getAllAddresses;
var getSingleAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, AddressModel_1.default.getAddress(id)];
            case 1:
                address = _a.sent();
                if (!address) {
                    throw new expressError_1.NotFoundError("Address with id: ".concat(id, " cannot be found"));
                }
                else {
                    res.json({
                        message: "Address with id: ".concat(id),
                        data: address,
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getSingleAddress = getSingleAddress;
var getAllAddressesByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, listOfAddresses, fetchedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, AddressModel_1.default.getAddressByUser(id)];
            case 1:
                listOfAddresses = _a.sent();
                return [4 /*yield*/, UserModel_1.default.getUser(id)];
            case 2:
                fetchedUser = _a.sent();
                if (!fetchedUser) {
                    throw new expressError_1.NotFoundError("User with id: ".concat(id, " cannot be found"));
                }
                if (!listOfAddresses || listOfAddresses.length === 0) {
                    throw new expressError_1.NotFoundError("No addresses found for user with id: ".concat(id));
                }
                else {
                    res.json({
                        message: "List of all addresses for user with id: ".concat(id),
                        data: listOfAddresses,
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getAllAddressesByUser = getAllAddressesByUser;
var createAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, addressData, fetchedUser, validator, errs, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                addressData = req.body;
                return [4 /*yield*/, UserModel_1.default.getUser(id)];
            case 1:
                fetchedUser = _a.sent();
                if (!fetchedUser) {
                    throw new expressError_1.NotFoundError("User with id: ".concat(id, " cannot be found"));
                }
                validator = jsonschema_1.default.validate(addressData, addressCreate_json_1.default);
                if (!validator.valid) {
                    errs = (0, jsonSchemaHelper_1.default)(validator.errors);
                    throw new expressError_1.BadRequestError(errs);
                }
                return [4 /*yield*/, AddressModel_1.default.createAddress(addressData, id)];
            case 2:
                address = _a.sent();
                res.status(201).json({
                    message: "Address created successfully",
                    data: address,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.createAddress = createAddress;
var updateAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, addressData, fetchedUser, fetchedAddress, validator, errs, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                userId = parseInt(req.params.userId);
                addressData = req.body;
                return [4 /*yield*/, UserModel_1.default.getUser(userId)];
            case 1:
                fetchedUser = _a.sent();
                if (!fetchedUser) {
                    throw new expressError_1.NotFoundError("User with id: ".concat(userId, " cannot be found"));
                }
                return [4 /*yield*/, AddressModel_1.default.getAddress(id)];
            case 2:
                fetchedAddress = _a.sent();
                if (!!fetchedAddress) return [3 /*break*/, 3];
                res.status(404).json({
                    message: "Address with id: ".concat(id, " cannot be found"),
                });
                return [3 /*break*/, 5];
            case 3:
                validator = jsonschema_1.default.validate(addressData, addressUpdate_json_1.default);
                if (!validator.valid) {
                    errs = (0, jsonSchemaHelper_1.default)(validator.errors);
                    throw new expressError_1.BadRequestError(errs);
                }
                return [4 /*yield*/, AddressModel_1.default.updateAddress(addressData, id, userId)];
            case 4:
                address = (_a.sent()) || {
                    id: "not found",
                };
                res.json({
                    message: "Address with id: ".concat(address.id, " was updated"),
                    data: address,
                });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateAddress = updateAddress;
var deleteAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user_id, fetchedUser, fetchedAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                user_id = parseInt(req.params.user_id);
                return [4 /*yield*/, UserModel_1.default.getUser(user_id)];
            case 1:
                fetchedUser = _a.sent();
                if (!fetchedUser) {
                    throw new expressError_1.NotFoundError("User with id: ".concat(user_id, " cannot be found"));
                }
                return [4 /*yield*/, AddressModel_1.default.getAddress(id)];
            case 2:
                fetchedAddress = _a.sent();
                if (!!fetchedAddress) return [3 /*break*/, 3];
                res.status(404).json({
                    message: "Address with id: ".concat(id, " cannot be found"),
                });
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, AddressModel_1.default.deleteAddress(id, user_id)];
            case 4:
                _a.sent();
                res.json({
                    message: "Address with id: ".concat(id, " was deleted"),
                });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteAddress = deleteAddress;
