import { Router } from 'express';
import { projectsController } from '../controllers/Projects.controller';
import { celebrate, Joi, Segments } from 'celebrate';

export const projectsRouter = Router();

projectsRouter.get('/all', projectsController.getAll);

projectsRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string(),
    },
  }),
  projectsController.getByTitle
);

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      type: Joi.string().required(),
      colorName: Joi.string().required(),
      className: Joi.string().required(),
      user_id: Joi.string().required(),
    },
  }),
  projectsController.create
);

projectsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      title: Joi.string().required(),
    },
  }),
  projectsController.update
);

projectsRouter.delete(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
    },
  }),
  projectsController.delete
);
