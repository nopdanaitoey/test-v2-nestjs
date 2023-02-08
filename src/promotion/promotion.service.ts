import { Injectable } from '@nestjs/common';
import {
  MyProduct,
  PromotionDetail,
  PromotionInput,
  ReturnPromotion,
} from './dto/promotion.dto';

@Injectable()
export class PromotionService {
  myProduct: MyProduct[] = [
    { name: 'A', price: 99 },
    { name: 'B', price: 199 },
    { name: 'C', price: 3990 },
  ];

  myPromotionA = 200;

  processPromotion(promotionInput: PromotionInput[]): ReturnPromotion {
    let totalPrice = 0;
    let aCount = 0;
    let bCount = 0;
    let totalDiscount = 0;
    const resultProcessPromotion: ReturnPromotion = new ReturnPromotion();
    const resultDetailPromotion: PromotionDetail[] = [];

    for (let i = 0; i < promotionInput.length; i++) {
      const product = this.myProduct.find(
        (e) => e.name === promotionInput[i].name,
      );
      if (product) {
        totalPrice += product.price * promotionInput[i].amount;
        if (promotionInput[i].name === 'A') {
          aCount += promotionInput[i].amount;
        }
        if (promotionInput[i].name === 'B') {
          bCount += promotionInput[i].amount;
        }
      }
    }
    const isPromotionA = totalPrice >= this.myPromotionA;
    if (isPromotionA) {
      resultDetailPromotion.push(this.calculatePromotionA(totalPrice));
    }

    const IsDiscountPromotionB = aCount > 0 && bCount > 0;
    if (IsDiscountPromotionB) {
      resultDetailPromotion.push(this.calculatePromotionB(aCount, bCount));
    }

    resultDetailPromotion.forEach((e) => {
      totalDiscount += e.discount;
    });
    resultProcessPromotion.priceBeforeDiscount = totalPrice;
    resultProcessPromotion.totalDiscount = totalDiscount;
    resultProcessPromotion.priceAfterDiscount = totalPrice - totalDiscount;
    resultProcessPromotion.message = `ราคาที่ต้องจ่าย ${resultProcessPromotion.priceAfterDiscount} บาท`;
    resultProcessPromotion.promotiondetails = resultDetailPromotion;

    return resultProcessPromotion;
  }

  calculatePromotionA = (totalPrice: number): PromotionDetail => {
    const IsDiscountPromotionA = 10;
    const discountPromotionA = (totalPrice * IsDiscountPromotionA) / 100;
    const returnPromotionA: PromotionDetail = {
      discription: `ซื้อครบ 200 บาท ลด 10%, ลูกค้าซื้อสินค้าทั้งสิ้น ${totalPrice} บาท, ลดไปทั้งสิ้น ${discountPromotionA} บาท`,
      discount: discountPromotionA,
    };
    return returnPromotionA;
  };

  calculatePromotionB = (aCount: number, bCount: number): PromotionDetail => {
    const twinProduct = Math.min(aCount, bCount);
    const discountPromotionB = twinProduct * 50;
    const promotionDetail = `ซื้อ A + B ลด 50 บาท, ซื้อ A = ${aCount} ชิ้น, ซื้อ B = ${bCount} ชิ้น, ซื้อไปทั้งหมด ${twinProduct} คู่, ลดไปทั้งหมด ${discountPromotionB} บาท`;
    const returnPromotionB: PromotionDetail = {
      discription: promotionDetail,
      discount: discountPromotionB,
    };
    return returnPromotionB;
  };
}
