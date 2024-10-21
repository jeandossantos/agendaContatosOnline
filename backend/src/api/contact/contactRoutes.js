import { Router } from 'express';
import { ContactFactory } from './contactFactory.js';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.js';

const contactController = ContactFactory.getInstance();
const routes = Router();

routes.post('/create', ensureAuthenticated, (req, res) => {
  return contactController.handleCreate(req, res);
});

export { routes as contactRoutes };
