import express from "express";
import { Register, Login, googleOAuthRegister } from "../controllers/auth.js";


const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/google/register", googleOAuthRegister);

export default router;