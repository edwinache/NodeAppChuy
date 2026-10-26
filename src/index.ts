import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from NodeAppChuy running with TypeScript & Docker!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
