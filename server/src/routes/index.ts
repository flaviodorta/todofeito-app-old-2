import { Router } from 'express';
import { todosRouter } from './Todos.route';

export const routes = Router();

routes.use('/todos', todosRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dev' });
});
