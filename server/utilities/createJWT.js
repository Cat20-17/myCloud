const config = require("config");
const jwt = require("jsonwebtoken");

class CreateJWT {
  static #accessSecretKey = config.get('accessSecretKey');
  static #refreshSecretKey = config.get('refreshSecretKey');

  static access(payload) {
    return jwt.sign(
      {...payload},
      this.#accessSecretKey,
      {expiresIn: '30m'}
    );
  };
  static refresh(payload) {
    return jwt.sign(
      {...payload},
      this.#refreshSecretKey,
      {expiresIn: '7d'}
    );
  };
}

module.exports = CreateJWT;