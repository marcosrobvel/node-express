import express, { Request, Response } from 'express';
import * as contactController from '../controllers/contactController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => contactController.getContacts(req, res));

router.get('/:id', async (req: Request, res: Response) => {
  try {
    await contactController.getContactById(req, res);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    await contactController.createContact(req, res);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await contactController.updateContact(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await contactController.deleteContact(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
