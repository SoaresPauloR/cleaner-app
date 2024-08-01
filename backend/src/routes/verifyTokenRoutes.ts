import { Router } from 'express';
import VerifyTokenController from '../controllers/VerifyTokenController';

const verifyToken = Router();

verifyToken.post('/', VerifyTokenController.index);

export default verifyToken;
