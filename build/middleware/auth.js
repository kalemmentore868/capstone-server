"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureCorrectUserOrAdmin = exports.ensureAdmin = exports.ensureLoggedIn = exports.authenticateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var expressError_1 = require("../helpers/expressError");
/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the email,first_name,last_name & isadmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */
function authenticateJWT(req, res, next) {
    try {
        //Extracting the token from the header of the request
        var authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            //strip off the word Bearer infront from the token
            var token = authHeader.replace(/^[Bb]earer /, "").trim();
            //assigns the payload from the token to a global variable
            var secretKey = process.env.SECRET_KEY || "dog";
            res.locals.user = jsonwebtoken_1.default.verify(token, secretKey);
        }
        return next();
    }
    catch (err) {
        return next();
    }
}
exports.authenticateJWT = authenticateJWT;
/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */
function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) {
            throw new expressError_1.UnauthorizedError();
        }
        return next(); //if you are logged in
    }
    catch (err) {
        return next(err);
    }
}
exports.ensureLoggedIn = ensureLoggedIn;
/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */
function ensureAdmin(req, res, next) {
    try {
        if (!res.locals.user || res.locals.user.is_admin === false) {
            throw new expressError_1.UnauthorizedError();
        }
        return next(); // only way you would come here is if isadmin key is true
    }
    catch (err) {
        return next(err);
    }
}
exports.ensureAdmin = ensureAdmin;
/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */
function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        var user = res.locals.user;
        if (!(user &&
            (user.is_admin ||
                parseInt(user.id) === parseInt(req.params.id) ||
                parseInt(user.id) === parseInt(req.params.userId)))) {
            throw new expressError_1.UnauthorizedError();
        }
        return next();
    }
    catch (err) {
        return next(err);
    }
}
exports.ensureCorrectUserOrAdmin = ensureCorrectUserOrAdmin;
