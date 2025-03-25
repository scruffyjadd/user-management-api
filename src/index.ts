import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/ormconfig";
import userRoutes from "./routes/user";


const app = express();
app.use(express.json());


// Connect to database
AppDataSource.initialize()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection failed", error));


app.use("/users", userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
