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
var db_1 = __importDefault(require("../config/db"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var SellerModel = /** @class */ (function () {
    function SellerModel() {
    }
    SellerModel.createSeller = function (seller) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashPassword, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcryptjs_1.default.hash(seller.password, salt)];
                    case 2:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, db_1.default.query("INSERT INTO sellers (address, opening_hours, name, email, password, phone_no) VALUES('".concat(seller.address, "','").concat(seller.opening_hours, "','").concat(seller.name, "', '").concat(seller.email, "','").concat(hashPassword, "', '").concat(seller.phone_no, "') RETURNING *"))];
                    case 3:
                        results = _a.sent();
                        return [2 /*return*/, results.rows[0]];
                }
            });
        });
    };
    SellerModel.getAllSellers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT id, address, opening_hours, name, email,phone_no, password FROM sellers;")];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.rows];
                }
            });
        });
    };
    SellerModel.getSeller = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT id,address, opening_hours, name, email, phone_no, password FROM sellers WHERE id = ".concat(id))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.rows[0]];
                }
            });
        });
    };
    SellerModel.getSellerByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("SELECT id, address, opening_hours, name, email, phone_no, password FROM sellers WHERE email = '".concat(email, "'"))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.rows[0]];
                }
            });
        });
    };
    SellerModel.deleteSeller = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("DELETE FROM sellers WHERE id = '".concat(id, "'"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SellerModel.updateSeller = function (seller_form_data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("UPDATE sellers SET address ='".concat(seller_form_data.address, "',\n          email='").concat(seller_form_data.email, "',\n          name='").concat(seller_form_data.name, "',\n          opening_hours='").concat(seller_form_data.opening_hours, "'\n          WHERE id=").concat(id, "\n          RETURNING *;"))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.rows[0]];
                }
            });
        });
    };
    return SellerModel;
}());
exports.default = SellerModel;
