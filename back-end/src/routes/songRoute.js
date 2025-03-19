import { addSong, listSong, removeSong } from "../controllers/songController.js";
import express from "express";
import uplaod from "../middleware/mutlter.js";

const songRouter = express.Router(); 

songRouter.post("/add",uplaod.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addSong);
songRouter.get("/list",listSong);
songRouter.post("/remove",removeSong);

export default songRouter;