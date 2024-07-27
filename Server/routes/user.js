import express from "express";
import { signIn, signUp } from "../controlllers/user.js";

const router = express.Router();

router.post('/signin', signIn)
router.post('/signup', signUp);

export default router;
