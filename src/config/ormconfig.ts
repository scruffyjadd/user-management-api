import { DataSource } from "typeorm";
import { User } from "../entities/User";
import dotenv from "dotenv";


dotenv.config();


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "user_management",
  synchronize: true,
  logging: false,
  entities: [User],
});
