import express from "express";


import {

getNotifications,

markNotificationRead,

markAllRead,

clearNotifications

} from "../controllers/notificationController.js";


import { protect } from "../middleware/authMiddleware.js";




const router = express.Router();






// =====================================
// GET ALL USER NOTIFICATIONS
// GET /api/notifications
// =====================================

router.get(

"/",

protect,

getNotifications

);









// =====================================
// MARK ALL NOTIFICATIONS READ
// PUT /api/notifications/read-all
// IMPORTANT:
// Keep this ABOVE /:id route
// =====================================


router.put(

"/read-all",

protect,

markAllRead

);









// =====================================
// MARK SINGLE NOTIFICATION READ
// PUT /api/notifications/:id
// =====================================


router.put(

"/:id",

protect,

markNotificationRead

);









// =====================================
// DELETE ALL NOTIFICATIONS
// DELETE /api/notifications
// =====================================


router.delete(

"/",

protect,

clearNotifications

);








export default router;