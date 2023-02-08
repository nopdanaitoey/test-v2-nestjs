import { IsNotEmpty, Min } from 'class-validator';

export class ExchangeInput {
  @IsNotEmpty({ message: 'Please provide pay' })
  @Min(0, { message: 'Pay must more than 0' })
  pay: number;
  @IsNotEmpty({ message: 'Please provide price' })
  @Min(0, { message: 'Pric must more than 0' })
  price: number;
}

export class ReturnResultExchange {
  exchange: string;
  message: string;
}
