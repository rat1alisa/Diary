import { Router } from 'express';
import { registrationController } from '../controller/registration.controller';
import { asyncHandler } from '../../../shared/lib/asyncHandler';

const registrationRoutes = Router();

registrationRoutes.post('/', asyncHandler(registrationController.register));

registrationRoutes.get('/', (req, res) => {
    res.status(405).json({ message: 'Use POST method for registration' });
  });

export default registrationRoutes;