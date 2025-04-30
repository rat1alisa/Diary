import { Request, Response } from 'express';
import { registrationService } from '../service/registration.service';

export const registrationController = {
  register: async (req: Request, res: Response) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
      const user = await registrationService.register({ username, email, password });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Registration failed' });
    }
  }
};