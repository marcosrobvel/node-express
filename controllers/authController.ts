import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const hardcodedUser = {
  username: 'admin',
  password: 'admin',
};

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Faltan credenciales' });
  }

  if (username !== hardcodedUser.username || password !== hardcodedUser.password) {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ username }, process.env.SECRET_KEY as string, { expiresIn: '4h' });

  res.json({
    token,
    user: {
      username,
    },
  });
};
