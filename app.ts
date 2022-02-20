import express from 'express';
import { json } from 'body-parser'
import { userRouter } from './routes/user';
import connectDB from './db/dbConection';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';


dotenv.config();

const app = express();
app.use(json());
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
connectDB();

const port : number = Number(process.env.PORT) || 4000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port: ${port}`);
})