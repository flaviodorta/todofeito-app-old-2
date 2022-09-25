import { Router } from 'express';
import { sessionsRouter } from './Sessions.route';
import { todosRouter } from './Todos.route';
import { usersRouter } from './Users.route';

export const routes = Router();

routes.use('/todos', todosRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
