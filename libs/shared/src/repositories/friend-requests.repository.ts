import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequestEntity } from '../entities/friend-request.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { FriendRequestsRepositoryInterface } from '../interfaces/friend-requests.repository.interface';

@Injectable()
export class FriendRequestRepository
  extends BaseAbstractRepository<FriendRequestEntity>
  implements FriendRequestsRepositoryInterface
{
  constructor(
    @InjectRepository(FriendRequestEntity)
    private readonly friendRequestEntity: Repository<FriendRequestEntity>,
  ) {
    super(friendRequestEntity);
  }
}
