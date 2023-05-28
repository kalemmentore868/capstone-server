"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressError = exports.NotFoundError = exports.UnauthorizedError = exports.BadRequestError = exports.ForbiddenError = void 0;
var ExpressError = /** @class */ (function (_super) {
    __extends(ExpressError, _super);
    function ExpressError(message, status) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.status = status;
        return _this;
    }
    return ExpressError;
}(Error));
exports.ExpressError = ExpressError;
/** 404 NOT FOUND error. */
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        if (message === void 0) { message = "Not Found"; }
        return _super.call(this, message, 404) || this;
    }
    return NotFoundError;
}(ExpressError));
exports.NotFoundError = NotFoundError;
/** 401 UNAUTHORIZED error. */
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        if (message === void 0) { message = "Unauthorized"; }
        return _super.call(this, message, 401) || this;
    }
    return UnauthorizedError;
}(ExpressError));
exports.UnauthorizedError = UnauthorizedError;
/** 400 BAD REQUEST error. */
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message) {
        if (message === void 0) { message = "Bad Request"; }
        return _super.call(this, message, 400) || this;
    }
    return BadRequestError;
}(ExpressError));
exports.BadRequestError = BadRequestError;
/** 403 BAD REQUEST error. */
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message) {
        if (message === void 0) { message = "Forbidden Request"; }
        return _super.call(this, message, 403) || this;
    }
    return ForbiddenError;
}(ExpressError));
exports.ForbiddenError = ForbiddenError;
