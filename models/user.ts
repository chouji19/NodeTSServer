import mongoose from 'mongoose';

interface IUser {
	firstname: string,
	lastname: string,
	email: string,
	password: string,
}

interface UserDoc extends mongoose.Document {
	firstname: string,
	lastname: string,
	email: string,
	password: string,
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
	build(attr: IUser): UserDoc
}

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		trim: true
	},
	lastname: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
	}
})

userSchema.virtual("fullName").get(function (user: IUser) {
	return user.firstname + user.lastname
})

userSchema.statics.build = (attr: IUser) => {
	return new User(attr);
}

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema);


export { User };

User.build({
	firstname: 'something',
	lastname: 'something',
	email: 'camilo@email.com',
	password: '12344566'
})