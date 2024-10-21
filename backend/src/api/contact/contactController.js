import { BadRequestException, HttpStatus } from 'http-exception-library';
import { isEmailOrError } from '../../validation/validators.js';

export class ContactController {
  #contactRepository;

  constructor(contactRepository) {
    this.#contactRepository = contactRepository;
  }

  async handleCreate(req, res) {
    const { user_id } = req;
    const { name, phone_number, phone_number_2, email, email_2, address } =
      req.body;

    await this.#contactRepository.create({
      user_id,
      name,
      phone_number,
      phone_number_2,
      email,
      email_2,
      address,
    });

    return res.status(HttpStatus.CREATED).send();
  }

  async handleRemove(req, res) {
    const { id } = req.params;

    await this.#contactRepository.remove(parseInt(id));

    return res.status(HttpStatus.OK).send();
  }

  async handleShow(req, res) {
    const { id } = req.params;

    const contact = await this.#contactRepository.show(parseInt(id));

    return res.json(contact); // Retorna o contato encontrado
  }

  async handleFind(req, res) {
    const { user_id } = req;
    const { search, page, limit } = req.query;

    const contacts = await this.#contactRepository.listUserContacts({
      user_id,
      search,
      limit,
      page,
    });

    return res.json(contacts);
  }

  async handleUpdate(req, res) {
    const { id } = req.params;
    const { name, phone_number, phone_number_2, email, email_2, address } =
      req.body;

    if (email) {
      isEmailOrError(email, 'Informe e-mail válido.', BadRequestException);
    }

    if (email_2) {
      isEmailOrError(
        email_2,
        'Informe segundo e-mail válido.',
        BadRequestException
      );
    }

    const updatedContact = await this.#contactRepository.update(id, {
      name,
      phone_number,
      phone_number_2,
      email,
      email_2,
      address,
    });

    return res.json(updatedContact);
  }
}
