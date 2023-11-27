// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const jwtConstants = {
  secret: process.env.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN,
};

export { jwtConstants };
