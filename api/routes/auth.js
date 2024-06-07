import express from "express"
import { googleAuth, signin, signup } from "../controllers/auth.js"

const router = express.Router()


//create
router.post("/signup", signup)


//sign in

router.post("/signin", signin )

//google auth

router.post("/google", googleAuth )

export default router