import bcrypt from 'bcrypt';

export function encryptPassword(password, salt = 10) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(salt));
}
