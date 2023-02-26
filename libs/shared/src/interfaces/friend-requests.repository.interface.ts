import { FriendRequestEntity } from '@app/shared/entities/friend-request.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export type FriendRequestsRepositoryInterface =
  BaseInterfaceRepository<FriendRequestEntity>;
