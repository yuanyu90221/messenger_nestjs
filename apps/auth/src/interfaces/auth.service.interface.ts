import { FriendRequestEntity } from '@app/shared/entities/friend-request.entity';
import { UserEntity } from '@app/shared/entities/user.entity';
import { UserJwt } from '@app/shared/interfaces/user-jwt.interface';
import { ExistingUserDto } from '../dtos/existing-user.dto';
import { NewUserDto } from '../dtos/new-user.dto';

export interface AuthServiceInterface {
  getUsers(): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  hashPassword(plainPassword: string): Promise<string>;
  register(newUser: Readonly<NewUserDto>): Promise<UserEntity>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<UserEntity>;
  login(existedUser: Readonly<ExistingUserDto>): Promise<{
    token: string;
    user: UserEntity;
  }>;
  verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }>;
  getUserFromHeader(jwt: string): Promise<UserJwt>;
  addFriend(userId: number, friendId: number): Promise<FriendRequestEntity>;
  getFriends(userId: number): Promise<FriendRequestEntity[]>;
}
