import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createDatabase from "./config/dbConfig.js";
import allRoutes from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
createDatabase();

// Routes
app.use('/api/v1', allRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
