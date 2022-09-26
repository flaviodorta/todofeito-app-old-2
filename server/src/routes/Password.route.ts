import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { usersController } from '../controllers/Users.controller';

export const passwordRoutes = Router();

passwordRoutes.get(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  usersController.sendForgotPasswordEmail
);

passwordRoutes.get(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  usersController.resetForgotPasswordEmail
);
