import { Router } from 'express';
import { UserFactory } from './userFactory.js';

const userController = UserFactory.instance();
const routes = Router();

routes.post('/register', (req, res) => {
  return userController.handleRegister(req, res);
});

export { routes as userRoutes };
