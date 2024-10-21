import { HttpStatus } from 'http-exception-library';

export class AuthController {
  #authService;

  constructor(authService) {
    this.#authService = authService;
  }

  async handleRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    await this.#authService.register({
      name,
      email,
      password,
      confirmPassword,
    });

    return res.status(HttpStatus.CREATED).send();
  }

  async handleLogin(req, res) {
    const { email, password } = req.body;

    const payload = await this.#authService.login({ email, password });

    return res.status(HttpStatus.OK).json(payload);
  }

  async handleRefreshToken(req, res) {
    const { refreshToken } = req.body;

    const payload = await this.#authService.refreshToken(refreshToken);
    console.log(payload);

    return res.json(payload);
  }
}
