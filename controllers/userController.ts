import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { User } from '../interfaces/userInterface';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const users: User[] = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error en getUsers:', error);
    res.status(500).json({ 
      message: "Error interno al obtener los usuarios",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  
  if (!userId) {
    return res.status(400).json({ message: "ID de usuario no proporcionado" });
  }

  try {
    const user: User | undefined = await userService.getUserById(Number(userId));
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(`Error en getUserById para ID ${userId}:`, error);
    return res.status(500).json({ 
      message: "Error interno al obtener el usuario",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userData: Partial<User> = req.body;
  
  if (!userData.photo || !userData.name || !userData.mail || !userData.job || !userData.phone || !userData.status || !userData.startDate || !userData.endDate) {
    return res.status(400).json({ 
      message: "Datos incompletos: photo, name, mail, job, phone, status, startDate y endDate son requeridos" 
    });
  }

  try {
    const newUser: User = await userService.createUser(userData as Omit<User, 'id'>);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error en createUser:', error);

    if (error instanceof Error) {
      const statusCode = error.name === 'ValidationError' ? 400 : 500;
      return res.status(statusCode).json({ 
        message: error.name === 'ValidationError' 
          ? error.message 
          : "Error interno al crear el usuario",
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    } else {
      return res.status(500).json({ 
        message: "Error interno al crear el usuario",
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body;

  if (!userData.photo || !userData.name || !userData.mail || !userData.job || !userData.phone || !userData.status || !userData.startDate || !userData.endDate) {
    return res.status(400).json({ 
      message: "Datos incompletos: photo, name, mail, job, phone, status, startDate y endDate son requeridos" 
    });
  }

  try {
    const updatedUser = await userService.updateUser(Number(id), userData);
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      return res.status(500).json({ message: 'Error interno al actualizar el usuario' });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("ID recibido para eliminar:", id);
  try {
    const deletedUser = await userService.deleteUser(Number(id));
    res.status(200).json(deletedUser);
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(500).json({ message: 'Error interno al eliminar el usuario' });
    }
  }
};
