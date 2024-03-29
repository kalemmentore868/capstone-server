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
exports.signup = exports.login = void 0;
var UserModel_1 = __importDefault(require("../models/UserModel"));
var expressError_1 = require("../helpers/expressError");
var jsonSchemaHelper_1 = __importDefault(require("../helpers/jsonSchemaHelper"));
var jsonschema_1 = __importDefault(require("jsonschema"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var userAuth_json_1 = __importDefault(require("../schemas/userAuth.json"));
var userRegister_json_1 = __importDefault(require("../schemas/userRegister.json"));
var adminRegister_json_1 = __importDefault(require("../schemas/adminRegister.json"));
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validator, errs, _a, email, password, user, SECRET_KEY, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validator = jsonschema_1.default.validate(req.body, userAuth_json_1.default);
                if (!validator.valid) {
                    errs = (0, jsonSchemaHelper_1.default)(validator.errors);
                    throw new expressError_1.BadRequestError(errs);
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.json({ message: "Username or password is incorrect" });
                }
                else {
                    if (!bcrypt_1.default.compareSync(password, user.password)) {
                        res.json({ message: "Username or password is incorrect" });
                    }
                    else {
                        SECRET_KEY = process.env.SECRET_KEY || "dog";
                        token = jsonwebtoken_1.default.sign({
                            _id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            is_admin: user.is_admin,
                        }, SECRET_KEY);
                        res.json({
                            message: "login successful",
                            data: {
                                _id: user._id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email,
                                is_admin: user.is_admin,
                                token: token,
                            },
                        });
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, validator, errs, foundUser, salt, hashPassword, user, SECRET_KEY, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userData = req.body;
                validator = jsonschema_1.default.validate(req.body, userRegister_json_1.default);
                if (!validator.valid) {
                    errs = (0, jsonSchemaHelper_1.default)(validator.errors);
                    throw new expressError_1.BadRequestError(errs);
                }
                return [4 /*yield*/, UserModel_1.default.findOne({ email: userData.email })];
            case 1:
                foundUser = _a.sent();
                if (foundUser) {
                    throw new expressError_1.BadRequestError("Sorry the email ".concat(req.body.email, " already exists"));
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(userData.password, salt)];
            case 3:
                hashPassword = _a.sent();
                userData.password = hashPassword;
                user = new UserModel_1.default(userData);
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                SECRET_KEY = process.env.SECRET_KEY || "dog";
                token = jsonwebtoken_1.default.sign({
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    is_admin: user.is_admin,
                }, SECRET_KEY);
                res.status(201).json({
                    message: "A User was created!",
                    data: {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        is_admin: user.is_admin,
                        token: token,
                    },
                });
                return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var adminSignup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, validator, errs, foundUser, salt, hashPassword, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userData = req.body;
                validator = jsonschema_1.default.validate(req.body, adminRegister_json_1.default);
                if (!validator.valid) {
                    errs = (0, jsonSchemaHelper_1.default)(validator.errors);
                    throw new expressError_1.BadRequestError(errs);
                }
                return [4 /*yield*/, UserModel_1.default.findOne({ email: userData.email })];
            case 1:
                foundUser = _a.sent();
                if (foundUser) {
                    throw new expressError_1.BadRequestError("Sorry the email ".concat(req.body.email, " already exists"));
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(userData.password, salt)];
            case 3:
                hashPassword = _a.sent();
                userData.password = hashPassword;
                user = new UserModel_1.default(userData);
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                console.log("User", user);
                res.status(201).json({
                    message: "An Admin User was created!",
                    data: user,
                });
                return [2 /*return*/];
        }
    });
}); };
