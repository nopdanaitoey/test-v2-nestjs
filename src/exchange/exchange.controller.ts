import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExchangeInput } from './dto/exchange.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  exchange(@Body() exchange: ExchangeInput) {
    return this.exchangeService.processExchange(exchange);
  }
}
