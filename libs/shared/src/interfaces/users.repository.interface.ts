import { UserEntity } from '../entities/user.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export type UserRepositoryInterface = BaseInterfaceRepository<UserEntity>;
