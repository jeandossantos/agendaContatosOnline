import { Router } from 'express';
import { ContactFactory } from './contactFactory.js';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.js';

const contactController = ContactFactory.getInstance();
const routes = Router();

routes.post('/create', ensureAuthenticated, (req, res) => {
  return contactController.handleCreate(req, res);
});

routes.delete('/delete/:id', ensureAuthenticated, (req, res) => {
  return contactController.handleRemove(req, res);
});

routes.get('/show/:id', ensureAuthenticated, (req, res) => {
  return contactController.handleShow(req, res);
});

routes.get('/list', ensureAuthenticated, (req, res) => {
  return contactController.handleFind(req, res);
});

routes.put('/update/:id', ensureAuthenticated, (req, res) => {
  return contactController.handleUpdate(req, res);
});

export { routes as contactRoutes };
