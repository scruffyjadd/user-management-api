import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../entities/User";


const router = Router();
const userRepository = AppDataSource.getRepository(User);


// Get all users
router.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    const users = await userRepository.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
});


// Get user by ID
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });


    const user = await userRepository.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User not found" });


    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user", error });
  }
});


// Update user
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });


    let user = await userRepository.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User not found" });


    userRepository.merge(user, req.body);
    user = await userRepository.save(user);


    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error updating user", error });
  }
});



export default router;
