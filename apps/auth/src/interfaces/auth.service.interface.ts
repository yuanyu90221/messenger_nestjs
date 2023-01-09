import { ExistingUserDto } from '../dtos/existing-user.dto';
import { NewUserDto } from '../dtos/new-user.dto';
import { UserEntity } from '../user.entity';

export interface AuthServiceInterface {
  getUsers(): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  hashPassword(plainPassword: string): Promise<string>;
  register(newUser: Readonly<NewUserDto>): Promise<UserEntity>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<UserEntity>;
  login(existedUser: Readonly<ExistingUserDto>);
  verifyJwt(jwt: string): Promise<{ exp: number }>;
}
