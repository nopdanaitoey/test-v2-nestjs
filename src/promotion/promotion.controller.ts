import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { PromotionInput } from './dto/promotion.dto';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {
  constructor(private promotionService: PromotionService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  promotion(@Body() promotionInput: Array<PromotionInput>) {
    return this.promotionService.processPromotion(promotionInput);
  }
}
