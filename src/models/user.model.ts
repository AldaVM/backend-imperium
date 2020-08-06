import { Schema, Document, model } from 'mongoose';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: number;
}

let valuesVaild: { values: String[], message: String } = {
  values: ['SUPER', 'VIEWER'],
  message: '{VALUE} not a permitted role'
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  createdAt: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    required: false,
    uppercase: true,
    enum: valuesVaild,
    default: 'VIEWER'
  }
});


userSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
}

//:(
userSchema.methods.comparePasswords = function (password: string) {
  return compareSync(password, this.password);
}

userSchema.pre("save", async function (next) {
  let user: any = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = genSaltSync(10);
  let passwordEncrypted = hashSync(user.password, salt);
  user.password = passwordEncrypted;
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const password = await this.getUpdate().password;
  if (!password) {
    return next();
  }
  try {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    this.getUpdate().password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});


export default model<IUser>('user', userSchema);