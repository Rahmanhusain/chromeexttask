// Controller for UserProfile
import UserProfile from "../models/UserProfile.js";

// POST /api/userprofiles
export async function createUserProfile(req, res) {
  try {
    const profile = await UserProfile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
