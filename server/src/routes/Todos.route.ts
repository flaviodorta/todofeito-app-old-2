import { Router } from 'express';
import { todoController } from '../controllers/Todos.controller';

export const todosRouter = Router();

todosRouter.get('/', todoController.getAll);
todosRouter.get('/search', todoController.getByText);
todosRouter.post('/', todoController.create);
todosRouter.put('/:id', todoController.update);
todosRouter.delete('/:id', todoController.delete);
