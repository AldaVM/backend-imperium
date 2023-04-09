import { Schema, Document, model, Types } from "mongoose";
import { compareSync, hashSync, genSaltSync } from "bcrypt";

import { IError } from "../middlewares/error.middleware";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

let valuesVaild: { values: String[]; message: String } = {
  values: ["SUPER", "VIEWER"],
  message: "{VALUE} not a permitted role",
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      required: false,
      uppercase: true,
      enum: valuesVaild,
      default: "VIEWER",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

userSchema.methods.toJSON = function () {
  let user: any = this.toObject();
  delete user.password;
  return user;
};

//:(
userSchema.methods.comparePasswords = function (password: string) {
  let user: any = this.toObject();
  return compareSync(password, user.password);
};

userSchema.pre("save", async function (next) {
  let user: any = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = genSaltSync(10);
  let passwordEncrypted = hashSync(user.password, salt);
  user.password = passwordEncrypted;
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const user = <IUser>this.getUpdate();
  const password = user ? user.password : null;
  if (!password) {
    return next();
  }
  try {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

export default model<IUser>("user", userSchema);
