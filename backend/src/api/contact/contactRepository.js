export class ContactRepository {
  #conn;

  constructor(connection) {
    this.#conn = connection;
  }

  async create({
    user_id,
    name,
    phone_number,
    phone_number_2,
    email,
    email_2,
    address,
  }) {
    await this.#conn.contact.create({
      data: {
        user_id,
        name,
        phone_number,
        phone_number_2,
        email,
        email_2,
        address,
      },
    });
  }

  async findById(id) {
    return await this.#conn.contact.findUnique({
      where: { id },
    });
  }

  async removeById(id) {
    return await this.#conn.contact.delete({
      where: { id },
    });
  }

  async find({ user_id, name = '', page = 1, limit = 10 }) {
    const skip = page * limit - limit;

    const contacts = await this.#conn.contact.findMany({
      where: {
        user_id,
        name: {
          startsWith: name,
        },
      },
      skip,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    // Contar o total de contatos correspondentes para fins de paginação
    const totalContacts = await this.#conn.contact.count({
      where: {
        name: {
          startsWith: name,
        },
      },
    });

    return {
      data: contacts,
      currentPage: page,
      totalPages: Math.ceil(totalContacts / limit),
      totalContacts,
    };
  }
}
