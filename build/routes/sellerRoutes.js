"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sellerController_1 = require("../controllers/sellerController");
var auth_1 = require("../middleware/auth");
var router = (0, express_1.Router)();
router.get("/", 
//ensureAdmin,
sellerController_1.getAllSellers);
router.post("/", auth_1.ensureCorrectUserOrAdmin, sellerController_1.createSeller);
router.get("/:id", auth_1.ensureCorrectUserOrAdmin, sellerController_1.getOneSeller);
router.put("/:id", auth_1.ensureCorrectUserOrAdmin, sellerController_1.updateSeller);
router.delete("/:id", auth_1.ensureCorrectUserOrAdmin, sellerController_1.deleteSeller);
exports.default = router;
