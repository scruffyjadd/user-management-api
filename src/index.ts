import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/ormconfig";


const app = express();
app.use(express.json());


// Connect to database
AppDataSource.initialize()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection failed", error));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));