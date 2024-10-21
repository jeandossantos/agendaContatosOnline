import { BadRequestException, NotFoundException } from 'http-exception-library';
import { existsOrError, isEmailOrError } from '../../validation/validators.js';

export class ContactService {
  #contactRepository;

  constructor(contactRepository) {
    this.#contactRepository = contactRepository;
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
    existsOrError(user_id, 'Usuário não encontrado.', NotFoundException);
    existsOrError(name, 'informe o nome do Contato.', NotFoundException);
    existsOrError(phone_number, 'Informe o telefone', BadRequestException);
    isEmailOrError(email, 'Informe um e-email válido.', BadRequestException);
    existsOrError(
      address,
      'Informe o endereço do contato.',
      BadRequestException
    );

    if (email_2) {
      isEmailOrError(
        email,
        'Informe um segundo e-email válido.',
        BadRequestException
      );
    }

    await this.#contactRepository.create({
      user_id,
      name,
      phone_number,
      phone_number_2,
      email,
      email_2,
      address,
    });
  }

  async listUserContacts({ user_id, search, page, limit }) {
    const contacts = await this.#contactRepository.find({
      user_id,
      name: search,
      page,
      limit,
    });

    return contacts;
  }

  async remove(id) {
    const contactFound = await this.#contactRepository.findById(id);

    if (!contactFound) throw new BadRequestException('Contato não encontrado.');

    await this.#contactRepository.removeById(id);
  }

  async show(id) {
    const contactFound = await this.#contactRepository.findById(id);

    if (!contactFound) throw new BadRequestException('Contato não encontrado.');

    return contactFound; // Retorna o contato encontrado
  }

  async update(
    id,
    { name, phone_number, phone_number_2, email, email_2, address }
  ) {
    const contactFound = await this.#contactRepository.findById(id);

    if (!contactFound) throw new BadRequestException('Contato não encontrado.');

    contactFound.name = name || contactFound.name;
    contactFound.phone_number = phone_number || contactFound.phone_number;
    contactFound.phone_number_2 = phone_number_2 || contactFound.phone_number_2;
    contactFound.email = email || contactFound.email;
    contactFound.email_2 = email_2 || contactFound.email_2;
    contactFound.address = address || contactFound.address;

    const updatedContact = await this.#contactRepository.update(id, {
      name,
      phone_number,
      phone_number_2,
      email,
      email_2,
      address,
    });

    return updatedContact;
  }
}
