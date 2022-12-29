import { Router } from 'express';
import { passwordRouter } from './Password.route';
import { profileRouter } from './Profile.route';
import { projectsRouter } from './Projects.route';
import { sessionsRouter } from './Sessions.route';
import { todosRouter } from './Todos.route';
import { usersRouter } from './Users.route';
import { sectionsRouter } from './Sections.route';

export const routes = Router();

routes.use('/todos', todosRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/projects', projectsRouter);
routes.use('/sections', sectionsRouter);
