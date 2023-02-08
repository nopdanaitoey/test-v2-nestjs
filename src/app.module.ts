import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { PromotionModule } from './promotion/promotion.module';
import { TwosumModule } from './twosum/twosum.module';

@Module({
  imports: [PromotionModule, ExchangeModule, TwosumModule],
})
export class AppModule {}
