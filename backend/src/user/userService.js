import { BadRequestException } from 'http-exception-library';
import {
  existsOrError,
  isEmailOrError,
  equalsOrError,
  notExistsOrError,
} from '../validation/validators.js';

export class UserService {
  #userRepository;
  constructor(userRepository) {
    this.#userRepository = userRepository;
  }

  async register({ name, email, password, confirmPassword }) {
    existsOrError(name, 'Nome precisa ser informado.', BadRequestException);
    isEmailOrError(email, 'Informe um e-mail válido.', BadRequestException);
    existsOrError(
      password,
      'Senha precisa ser informada.',
      BadRequestException
    );
    existsOrError(
      confirmPassword,
      'Confirmação de senha precisa ser informada.',
      BadRequestException
    );
    equalsOrError(
      password,
      confirmPassword,
      'Senhas não coincidem.',
      BadRequestException
    );

    const userExists = await this.#userRepository.findByEmail(email);

    if (userExists) throw new BadRequestException('User já registrado.');

    await this.#userRepository.create({ name, email, password });
  }
}
