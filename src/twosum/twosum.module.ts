import { Module } from '@nestjs/common';
import { TwosumService } from './twosum.service';
import { TwosumController } from './twosum.controller';

@Module({
  controllers: [TwosumController],
  providers: [TwosumService],
})
export class TwosumModule {}
