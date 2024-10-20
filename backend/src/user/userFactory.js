import { UserRepository } from './userRepository.js';
import { UserService } from './userService.js';
import { UserController } from './userController.js';
import { Database } from '../connection.js';

export class UserFactory {
  static getInstance() {
    const prisma = new Database().getConnection(); // Instancia o cliente Prisma
    const userRepository = new UserRepository(prisma); // Instancia o repositório
    const userService = new UserService(userRepository); // Instancia o serviço
    const userController = new UserController(userService); // Instancia o controlador

    return userController; // Retorna a instância do controlador
  }
}
