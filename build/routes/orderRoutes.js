"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orderController_1 = require("../controllers/orderController");
var auth_1 = require("../middleware/auth");
var router = (0, express_1.Router)();
router.get("/", 
//ensureCorrectUserOrAdmin,
orderController_1.getAllOrdersInDb);
router.get("/:id", auth_1.ensureCorrectUserOrAdmin, orderController_1.getOrders);
router.post("/:id", auth_1.ensureCorrectUserOrAdmin, orderController_1.checkout);
exports.default = router;
