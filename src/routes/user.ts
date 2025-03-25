import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../entities/User";


const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Delete user
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });


    const user = await userRepository.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User not found" });


    await userRepository.remove(user);
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user", error });
  }
});


export default router;
