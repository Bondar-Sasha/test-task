import express from 'express';
import { resolve } from 'node:path';
import { config } from 'dotenv';
config({ path: resolve(process.cwd(), '../../.env') });
import { PrismaClient } from '../prisma_client/index.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = process.env.EXPRESS_APP_PORT;

const App = async () => {
  try {
    if (!PORT) {
      throw new Error('PORT is not defined');
    }
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`Express App -> postgres`);
    });
  } catch (error) {
    console.error(error);
  }
};

App();
