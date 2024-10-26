import { BadRequestException } from 'http-exception-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {
  existsOrError,
  isEmailOrError,
  equalsOrError,
} from '../../validation/validators.js';

export class AuthService {
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

  async login({ email, password }) {
    if (!email || !password) {
      throw new BadRequestException('Informe email/usuário e senha.');
    }

    isEmailOrError(email, 'Informe um e-mail válido.', BadRequestException);

    const foundUser = await this.#userRepository.findByEmail(email);

    if (!foundUser) {
      throw new BadRequestException(
        'Informe email/usuário ou senha incorreto.'
      );
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      throw new BadRequestException(
        'Informe email/usuário ou senha incorreto.'
      );
    }

    const accessToken = jwt.sign(
      {
        username: foundUser.name,
        email: foundUser.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '60m',
        subject: String(foundUser.id),
      }
    );

    return {
      accessToken,
    };
  }

  async validateToken(token) {
    try {
      if (!token) {
        return false;
      }

      const { sub: userId } = jwt.verify(token, process.env.SECRET_KEY);

      const user = await this.#userRepository.findById(parseInt(userId));

      if (!user) return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}
