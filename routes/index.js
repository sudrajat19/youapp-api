import express from "express";
import routerUser from "./routerUser.js";
import routerMessage from "./routerMessage.js";
import routerProfile from "./routerProfile.js";
import routerInterest from "./routerInterest.js";

const router = express.Router();

router.use(routerUser);
router.use(routerProfile);
router.use("/messages", routerMessage);
router.use(routerInterest);
export default router;
