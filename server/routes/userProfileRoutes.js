// Router for UserProfile APIs
import { Router } from "express";
import { createUserProfile } from "../controllers/userProfileController.js";
import demoAuth from "../middleware/demoAuth.js";

const router = Router();

// POST API with demo authentication middleware
router.post("/", demoAuth, createUserProfile);

export default router;
