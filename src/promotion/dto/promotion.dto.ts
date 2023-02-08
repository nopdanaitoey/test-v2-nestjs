import { IsNotEmpty } from 'class-validator';

export class PromotionInput {
  @IsNotEmpty({ message: 'Please provide product' })
  name: string;
  @IsNotEmpty({ message: 'Please provide amount' })
  amount: number;
}
export class MyProduct {
  name: string;
  price: number;
}

export class PromotionDetail {
  discription: string;
  discount: number;
}

export class ReturnPromotion {
  priceBeforeDiscount: number;
  totalDiscount: number;
  priceAfterDiscount: number;
  message: string;
  promotiondetails: Array<PromotionDetail>;
}
