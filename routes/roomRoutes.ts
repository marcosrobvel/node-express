import express, { Request, Response } from 'express';
import * as roomController from '../controllers/roomController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => roomController.getRooms(req, res));
router.get('/:id', async (req: Request, res: Response) => {
	try {
		await roomController.getRoomById(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
});
router.post('/', async (req: Request, res: Response) => {
	try {
		await roomController.createRoom(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
      await roomController.updateRoom(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      await roomController.deleteRoom(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;