const config = require("config");
const jwt = require("jsonwebtoken");

function createJWT (payload) {
  const SECRET_KEY = config.get('secretKey')
  return jwt.sign(
    {...payload},
    SECRET_KEY,
    {expiresIn: '1h'}
  );
}

module.exports = createJWT