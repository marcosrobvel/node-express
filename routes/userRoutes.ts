import express, { Request, Response } from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => userController.getUsers(req, res));

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await userController.getUserById(req, res);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
