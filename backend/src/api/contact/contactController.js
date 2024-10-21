import { HttpStatus } from 'http-exception-library';

export class ContactController {
  #contactRepository;

  constructor(contactRepository) {
    this.#contactRepository = contactRepository;
  }

  async handleCreate(req, res) {
    const { user_id } = req;
    const { phone_number, phone_number_2, email, email_2, address } = req.body;

    await this.#contactRepository.create({
      user_id,
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
}
