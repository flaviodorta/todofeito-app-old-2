import dotenv from 'dotenv';

dotenv.config();

const {
  PORT_SERVER,
  PORT_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

export default {
  port_server: PORT_SERVER,
  port_db: PORT_DB,
  postgres_username: POSTGRES_USERNAME,
  postgres_password: POSTGRES_PASSWORD,
  postgres_db: POSTGRES_DB,
};
