import { Router } from 'express';
import { AuthFactory } from './authFactory.js';

const authController = AuthFactory.getInstance();
const routes = Router();

routes.post('/register', (req, res) => {
  return authController.handleRegister(req, res);
});

routes.post('/login', (req, res) => {
  return authController.handleLogin(req, res);
});

routes.post('/refreshToken', (req, res) => {
  return authController.handleRefreshToken(req, res);
});

export { routes as authRoutes };
