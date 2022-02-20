import { Request, Response } from 'express';
import { User } from '../models/user';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (!existUser) {
    res.status(400).send({ error: true, msg: "User not valid" });
    return;
  }
  const passwordCorrect = await bcryptjs.compare(password, existUser.password);
  if (!passwordCorrect) {
    res.status(400).send({ error: true, msg: "Invalid credentials" });
    return;
  }
  const { id } = existUser;
  const payload = {
    user: {
      id,
      email,
    },
  };
  jwt.sign(
    payload,
    process.env.SECRET_JWTKEY!,
    {
      expiresIn: "24hr",
    },
    (error, token) => {
      if (error) {
        res.status(400).send({ error: true, msg: "User not valid" });
      };
      console.log("end save customer jwt");
      return res.json({
        error: false,
        token
      });
    }
  );
}