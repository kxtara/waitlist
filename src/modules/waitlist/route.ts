import { Router } from "express";
import { handleSubscribe,handleUnsubscribe } from "./controller.js";
import { authLimiter } from "../../middleware/auth.middleware.js";

const router = Router();

router.post('/subscribe',authLimiter,handleSubscribe);
router.post('/unsubscribe',authLimiter,handleUnsubscribe);

export default router;