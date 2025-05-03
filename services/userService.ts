import { User } from "../interfaces/userInterface";
import { validateUserData } from "../validators/userValidator";
import UserModel from "../schemas/userSchema";

export class UserService {
  public async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find().lean();
    return users.map((user) => ({
      ...user,
      id: Number(user.id),
    }));
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await UserModel.findOne({ id }).lean();
    return user ? { 
      ...user,
      id: Number(user.id) 
    } : null;
  }

  public async createUser(userData: Omit<User, "id">): Promise<User> {
    validateUserData(userData);

    const lastUser = await UserModel.findOne().sort({ id: -1 }).limit(1);
    const newId = lastUser ? Number(lastUser.id) + 1 : 1;

    const newUser = new UserModel({
      ...userData,
      id: newId,
    });

    const savedUser = await newUser.save();
    return { 
      ...savedUser.toObject(), 
      id: Number(savedUser.id)
    };
  }

  public async updateUser(
    id: number,
    userData: Partial<Omit<User, "id">>
  ): Promise<User> {
    validateUserData(userData as Omit<User, "id">);
    const updatedUser = await UserModel.findOneAndUpdate(
      { id },
      userData,
      { new: true }
    ).lean();

    if (!updatedUser) throw new Error("User not found");

    return { 
      ...updatedUser, 
      id: Number(updatedUser.id)
    };
  }

  public async deleteUser(id: number): Promise<User> {
    const deletedUser = await UserModel.findOneAndDelete({ id }).lean();

    if (!deletedUser) throw new Error("User not found");

    return { 
      ...deletedUser, 
      id: Number(deletedUser.id)
    };
  }
}