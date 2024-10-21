import { UserRepository } from '../user/userRepository.js';
import { AuthService } from './authService.js';
import { AuthController } from './authController.js';
import { Database } from '../../connection.js';

export class AuthFactory {
  static getInstance() {
    const prisma = new Database().getConnection(); // Instancia o cliente Prisma
    const authRepository = new UserRepository(prisma); // Instancia o repositório
    const authService = new AuthService(authRepository); // Instancia o serviço
    const authController = new AuthController(authService); // Instancia o controlador

    return authController; // Retorna a instância do controlador
  }
}
