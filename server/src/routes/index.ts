import { Router } from 'express';
import { todosRouter } from './Todos.route';
import { usersRouter } from './Users.route';

export const routes = Router();

routes.use('/todos', todosRouter);
routes.use('/users', usersRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dev' });
});
