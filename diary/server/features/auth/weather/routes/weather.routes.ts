import { Router } from 'express';
import { asyncHandler } from '../../../../shared/lib/asyncHandler';
import { getWeatherByCity } from '../controller/weather.controller';

const weatherRouter = Router();

weatherRouter.get('/one', asyncHandler(getWeatherByCity)); 

export default weatherRouter;
