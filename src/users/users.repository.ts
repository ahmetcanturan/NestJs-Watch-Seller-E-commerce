import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async findById(UsersFilterQuery: FilterQuery<User>): Promise<UserDocument> {
    return this.UserModel.findById(UsersFilterQuery);
  }
  async findByEmail(email: string): Promise<UserDocument> {
    return this.UserModel.findOne({ email });
  }
  async create(Users: User): Promise<UserDocument> {
    const newUsers = new this.UserModel(Users);
    return newUsers.save();
  }
}
