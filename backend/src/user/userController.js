import { HttpStatus } from 'http-exception-library';

export class UserController {
  #userService;

  constructor(userService) {
    this.#userService = userService;
  }

  async handleRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    await this.#userService.register({
      name,
      email,
      password,
      confirmPassword,
    });

    return res.status(HttpStatus.CREATED).send();
  }
}
