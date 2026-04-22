import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegister } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);

export default router;