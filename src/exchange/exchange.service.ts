import { Injectable } from '@nestjs/common';
import { ExchangeInput, ReturnResultExchange } from './dto/exchange.dto';

@Injectable()
export class ExchangeService {
  myExchanges: number[] = [1, 2, 5, 10, 20, 50, 100, 500, 1000].reverse();

  async processExchange(
    exchangeInput: ExchangeInput,
  ): Promise<ReturnResultExchange> {
    const returnProcessExchange: ReturnResultExchange =
      new ReturnResultExchange();

    returnProcessExchange.message = '';

    let mustExchange = exchangeInput.pay - exchangeInput.price;
    if (mustExchange < 0) {
      returnProcessExchange.message = 'จำนวนเงินไม่พอ';
    } else if (mustExchange === 0) {
      returnProcessExchange.message = 'ไม่ต้องทอน';
    } else {
      returnProcessExchange.exchange = `จำนวนเงินที่ต้องทอนทั้งหมด ${mustExchange} บาท`;
      await this.myExchanges.forEach((e) => {
        if (mustExchange >= e) {
          const count = Math.floor(mustExchange / e);
          mustExchange -= count * e;
          if (e > 10 && mustExchange > 0) {
            returnProcessExchange.message += `ทอนแบงค์ ${e} บาท ${count} ใบ, `;
          } else if (e <= 10 && mustExchange > 0) {
            returnProcessExchange.message += `ทอนเหรียญ ${e} บาท ${count} เหรียญ, `;
          }
        }
      });
    }

    return returnProcessExchange;
  }
}
