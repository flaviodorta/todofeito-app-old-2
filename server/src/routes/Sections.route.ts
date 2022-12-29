import { Router } from 'express';
import { sectionsController } from '../controllers/Sections.controller';
import { celebrate, Joi, Segments } from 'celebrate';

export const sectionsRouter = Router();

sectionsRouter.get('/all', sectionsController.getAll);

sectionsRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string(),
    },
  }),
  sectionsController.getByTitle
);

sectionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      type: Joi.string().required(),
      index: Joi.number().required(),
    },
  }),
  sectionsController.create
);

sectionsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      title: Joi.string().required(),
    },
  }),
  sectionsController.update
);

sectionsRouter.delete(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sectionsController.delete
);
