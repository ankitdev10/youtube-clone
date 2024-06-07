import express from "express"
import { addVideo, addView, deleteVideo, getByTags, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js"
import {verifyToken} from "../verifyToken.js"
const router = express.Router()


// create a video
router.post("/",verifyToken, addVideo)

//update 

router.put("/:id",verifyToken, updateVideo)

//delete
router.delete("/:id",verifyToken, deleteVideo)

// get 

router.get("/find/:id", getVideo)

//view, update views when video opened

router.put("/view/:id", addView )

// trending
router.get("/trend", trend )

//random 
router.get("/random", random )

// subscribed channel videos
router.get("/sub", verifyToken, sub)

// get video by tags

router.get("/tags", getByTags)

// get video by title

router.get("/search",  search)





export default router