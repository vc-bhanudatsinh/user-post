import * as dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  port: process.env.PORT,
  dbUrl: process.env.MONGODB_URL,
};
