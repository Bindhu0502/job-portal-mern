import express from "express";

import {

saveJob,

removeSavedJob,

getSavedJobs

} from "../controllers/savedJobController.js";


import {protect} from "../middleware/authMiddleware.js";



const router=express.Router();




router.get(

"/my",

protect,

getSavedJobs

);



router.post(

"/:jobId",

protect,

saveJob

);



router.delete(

"/:jobId",

protect,

removeSavedJob

);



export default router;