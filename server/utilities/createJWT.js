const jwt = require("jsonwebtoken");

class CreateJWT {
  static #accessSecretKey = process.env.ACCESS_SECRET_KEY;
  static #refreshSecretKey = process.env.REFRESH_SECRET_KEY;

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