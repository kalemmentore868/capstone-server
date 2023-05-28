"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
function cleanUpErrorMesssages(errors) {
    var errorMsg = "";
    var errs = errors.map(function (e) {
        var _a;
        var key;
        //this is to the determine the key
        if (e.property.includes("instance.")) {
            key = e.property.replace("instance.", "");
        }
        else {
            key = e.argument;
        }
        //this is to convert first_name or firstName to First Name
        var property = lodash_1.default.startCase(lodash_1.default.camelCase(key));
        if (e.message.includes("requires")) {
            e.message = "".concat(property, " is required");
        }
        else if (e.message.includes("is not of a type")) {
            e.message = "".concat(property, " ").concat(e.message);
        }
        else if (e.message.includes("minimum") || e.message.includes("maximum")) {
            e.message = "".concat(property, " ").concat(e.message);
        }
        return _a = {},
            _a[key] = e.message,
            _a;
    });
    //This is used to convert an arary of objects into one big object
    for (var _i = 0, errs_1 = errs; _i < errs_1.length; _i++) {
        var err = errs_1[_i];
        // Object.assign(errorObj, err);
        for (var key in err) {
            errorMsg += " ".concat(err[key]);
        }
    }
    return errorMsg;
}
exports.default = cleanUpErrorMesssages;
