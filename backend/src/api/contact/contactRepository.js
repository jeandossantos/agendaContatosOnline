export class ContactRepository {
  #conn;

  constructor(connection) {
    this.#conn = connection;
  }

  async create({
    user_id,
    phone_number,
    phone_number_2,
    email,
    email_2,
    address,
  }) {
    await this.#conn.contact.create({
      data: {
        user_id,
        phone_number,
        phone_number_2,
        email,
        email_2,
        address,
      },
    });
  }
}
