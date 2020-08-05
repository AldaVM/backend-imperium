import { BaseRepository, IBaseRepository } from "./base.repository";
import { Model } from "mongoose";
import { IUser } from '../models/user.model';
import { UserModel } from '../models';




interface IUserRepository extends IBaseRepository{
    getUserByUserEmail(email:string):Promise<any>;
}

class UserRepository extends BaseRepository{
    private _userModel:Model<IUser>;

    constructor(userModel: Model<IUser>){
        super(userModel);
        this._userModel=userModel;
        this.create=this.create.bind(this);
    }


    async create(entity: object){
        const user=new this._userModel(entity);
        user.createdAt=user._id.getTimestamp();
        return await  user.save();
    }

    async getUserByUserEmail(email:string){
        return await this._userModel.findOne({email});
    }

}

const userRepository:IUserRepository=new UserRepository(UserModel);

export{
    userRepository,
    UserRepository,
    IUserRepository
}