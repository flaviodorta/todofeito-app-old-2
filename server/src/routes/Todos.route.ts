import { Router } from 'express';
import { todoController } from '../controllers/Todos.controller';
import { celebrate, Joi, Segments } from 'celebrate';

export const todosRouter = Router();

todosRouter.get('/', todoController.getAll);

todosRouter.get(
  '/search',
  celebrate({
    [Segments.BODY]: {
      searchedText: Joi.string(),
    },
  }),
  todoController.getByText
);

todosRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     title: Joi.string().required(),
  //     description: Joi.string().required(),
  //     type: Joi.string().required(),
  //     date: Joi.date().required(),
  //     priority: Joi.number().required(),
  //     isCompleted: Joi.boolean().required(),
  //   },
  // }),
  todoController.create
);

todosRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      priority: Joi.number().required(),
      isCompleted: Joi.boolean().required(),
    },
  }),
  todoController.update
);

todosRouter.delete(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
    },
  }),
  todoController.delete
);
