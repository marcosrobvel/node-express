// userService.ts
import { User } from '../interfaces/userInterface';
import pool from '../database/mongoConnection';

export class UserService {
  public async getAllUsers(): Promise<User[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM users'
    );
    return rows as User[];
  }

  public async getUserById(id: number): Promise<User | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as User) : null;
  }

  public async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const { photo, name, mail, job, phone, status, startDate, endDate } = userData;
    const [result] = await pool.execute(
      'INSERT INTO users (photo, name, mail, job, phone, status, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [photo, name, mail, job, phone, status, startDate, endDate]
    );
    return {
      ...userData,
      id: (result as any).insertId,
    };
  }

  public async updateUser(id: number, userData: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const { photo, name, mail, job, phone, status, startDate, endDate } = userData;
    const [result] = await pool.execute(
      'UPDATE users SET photo = ?, name = ?, mail = ?, job = ?, phone = ?, status = ?, startDate = ?, endDate = ? WHERE id = ?',
      [photo, name, mail, job, phone, status, startDate, endDate, id]
    );

    const updateResult = result as import('mysql2').ResultSetHeader;
    if (updateResult.affectedRows === 0) return null;

    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as User) : null;
  }

  public async deleteUser(id: number): Promise<User | null> {
    const [result] = await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    if ((result as import('mysql2').ResultSetHeader).affectedRows === 0) return null;

    return { id } as User;
  }
}




/*import { User } from "../interfaces/userInterface";
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
}*/