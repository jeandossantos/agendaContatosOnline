import jwt from 'jsonwebtoken';

export function ensureAuthenticated(request, response, next) {
  try {
    const authToken = request.headers.authorization;

    if (!authToken) return response.status(401).end();

    const [, token] = authToken.split(' ');

    const payload = jwt.verify(token, process.env.SECRET_KEY);

    request.user_id = parseInt(payload.sub);

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
