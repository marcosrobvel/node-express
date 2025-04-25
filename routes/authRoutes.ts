import express from 'express';
import { login } from '../controllers/authController';
import { RequestHandler } from 'express';

const router = express.Router();

router.post('/login', login as RequestHandler);

export default router;
