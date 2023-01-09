import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { NewUserDto } from './dtos/new-user.dto';
// test change bcrypt 5.0.1
import * as bcrypt from 'bcrypt';
import { ExistingUserDto } from './dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryInterface } from '@app/shared/interfaces/users.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }
  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByCondition({
      where: { email },
      select: ['id', 'firstName', 'lastName', 'email', 'password'],
    });
  }
  async hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, 12);
  }
  async register(newUser: Readonly<NewUserDto>): Promise<UserEntity> {
    const { firstName, lastName, email, password } = newUser;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(`An account with email ${email} existed`);
    }
    const hashedPasswd = await this.hashPassword(password);
    const savedUser = await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPasswd,
    });
    delete savedUser.password;
    return savedUser;
  }
  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);
    const doesUserExist = !!user;
    if (!doesUserExist) {
      return null;
    }
    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) {
      return null;
    }
    return user;
  }
  async login(existedUser: Readonly<ExistingUserDto>) {
    const { email, password } = existedUser;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwt = await this.jwtService.signAsync({
      user,
    });
    return { token: jwt };
  }
  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
