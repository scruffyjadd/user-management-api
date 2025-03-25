import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../entities/User";


const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Create a new user
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email } = req.body;


    // Validate input
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ message: "Name and email are required" });
    }


    // Check if email already exists
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }


    // Create and save new user
    const newUser = userRepository.create({ name, email });
    await userRepository.save(newUser);


    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
});


export default router;
