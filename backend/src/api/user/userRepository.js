import { encryptPassword } from '../../utils/encryptPassword.js';

export class UserRepository {
  #conn;

  constructor(conn) {
    this.#conn = conn;
  }

  async findByEmail(email) {
    const user = await this.#conn.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create({ name, email, password }) {
    const SALT_OR_ROUNDS = 12;
    const hashedPassword = encryptPassword(password, SALT_OR_ROUNDS);

    const user = await this.#conn.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Armazena a senha hasheada
      },
    });

    return user;
  }

  async findById(id) {
    const user = await this.#conn.user.findUnique({
      where: { id },
    });

    return user;
  }
}
