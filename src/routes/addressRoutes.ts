import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
  getAllAddressesByUser,
} from "../controllers/addressController";

const router = Router();

router.get("/", getAllAddresses);
router.get("/users/:id", getAllAddressesByUser);
router.get("/:id", getSingleAddress);
router.post("/:id", createAddress);
router.put("/:user_id/:id", updateAddress);
router.delete("/:user_id/:id", deleteAddress);

export default router;
