import { Injectable } from '@nestjs/common';
import { hashing } from 'src/utils/hashing';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findByEmail(email);
  }
  async findById(id: ObjectId): Promise<User | undefined> {
    return this.usersRepository.findById(id);
  }

  async register(user: User): Promise<UserDocument> {
    user.password = hashing(user.password);
    return this.usersRepository.create(user);
  }
}
