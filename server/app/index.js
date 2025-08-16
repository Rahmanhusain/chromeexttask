import express from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "../db.js";
import userProfileRouter from "../routes/userProfileRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

// Enable CORS to let user profiles be created from the frontend
app.use(cors({
  origin: "https://www.linkedin.com"
}));
// Parse JSON bodies
app.use(express.json());

// Mount user profile API
app.use("/api/userprofiles", userProfileRouter);

app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

// Sync Sequelize models and start server
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} on url http://localhost:${PORT}`);
  });
});
