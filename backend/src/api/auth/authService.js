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
        expiresIn: '15m',
        subject: String(foundUser.id),
      }
    );

    const refreshToken = jwt.sign(
      { id: foundUser.id },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d',
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token não fornecido.');
    }

    try {
      const { id: userId } = jwt.verify(refreshToken, process.env.SECRET_KEY);

      const user = await this.#userRepository.findById(userId);

      if (!user) throw new BadRequestException('Não encontrado.');

      const accessToken = await jwt.sign(
        {
          username: user.name,
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '15m', // Novo access token válido por 15 minutos
          subject: String(user.id), // Armazena o ID do usuário
        }
      );

      return accessToken;
    } catch (error) {
      throw new BadRequestException('Invalid Token.');
    }
  }
}
