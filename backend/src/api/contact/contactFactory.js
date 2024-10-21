import { ContactRepository } from './contactRepository.js';
import { ContactService } from './contactService.js';
import { ContactController } from './contactController.js';
import { Database } from '../../connection.js';

export class ContactFactory {
  static getInstance() {
    const prisma = new Database().getConnection(); // Instancia o cliente Prisma
    const contactRepository = new ContactRepository(prisma); // Instancia o repositório
    const contactService = new ContactService(contactRepository); // Instancia o serviço
    const contactController = new ContactController(contactService); // Instancia o controlador

    return contactController; // Retorna a instância do controlador
  }
}
