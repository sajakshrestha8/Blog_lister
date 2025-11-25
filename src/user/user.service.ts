import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userInfo: CreateUserDto) {
    const createdUser = this.userRepository.create(userInfo);
    return await this.userRepository.save(createdUser);
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserbyId(id: number) {
    console.log(id);
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async getUserbyEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
