
import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';

export const saveUser = async (req: Request, res: Response) => {
	const { firstname, lastname, email, password } = req.body;
	const userExist = await User.findOne({email});
	if(userExist){
		return res.status(400).send({
			error: true,
			msg: 'User already registered'
		})
	}
	var salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);
	const user = User.build({
		firstname,
		lastname,
		email,
		password: newPassword
	});
	await user.save()
	return res.status(201).send(user);
}

export const getUsers = async (req: Request, res: Response) => {
	try {
		return await User.find();
	} catch (error) {
		return res.status(500).send({
			error: true,
			msg: 'User not found'
		});
	}
}