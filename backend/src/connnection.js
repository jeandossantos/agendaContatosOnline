import { PrismaClient } from '@prisma/client';

export class Database {
  /**
   * Retorna uma conexão com o banco de dados.
   * @returns {PrismaClient} Uma instância do PrismaClient.
   */
  getConnection() {
    const prisma = new PrismaClient();

    return prisma;
  }
}
