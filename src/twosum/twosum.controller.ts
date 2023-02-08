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
import { Twosum } from './dto/twosum.dto';
import { TwosumService } from './twosum.service';

@Controller('twosum')
export class TwosumController {
  constructor(private twosumService: TwosumService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  twosum(@Body() twosum: Twosum) {
    const result = this.twosumService.processTwosum(twosum);
    return result;
  }
}
