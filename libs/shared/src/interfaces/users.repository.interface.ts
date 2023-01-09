import { UserEntity } from 'apps/auth/src/user.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export type UserRepositoryInterface = BaseInterfaceRepository<UserEntity>;
