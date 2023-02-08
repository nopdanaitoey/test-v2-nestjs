import { Injectable } from '@nestjs/common';
import { ReturnTwosum, Twosum } from './dto/twosum.dto';

@Injectable()
export class TwosumService {
  processTwosum(twosum: Twosum): ReturnTwosum {
    const returnProcessTowsum: ReturnTwosum = new ReturnTwosum();
    returnProcessTowsum.target = twosum.target;

    const map: Map<number, number> = new Map();
    let result: number[] = [];
    for (let i = 0; i < twosum.nums.length; i++) {
      const current = twosum.nums[i];
      const match = map.get(twosum.target - current);

      if (match !== undefined) {
        result = [i, match];
        break;
      }
      map.set(current, i);
    }
    returnProcessTowsum.indexNums = result;

    if (result.length <= 0) {
      returnProcessTowsum.message = `ไม่มีค่าที่บวกกันได้ ${twosum.target}`;
    } else {
      returnProcessTowsum.message = `เพราะ ${twosum.nums[result[0]]} + ${
        twosum.nums[result[1]]
      } = ${twosum.target}`;
    }

    return returnProcessTowsum;
  }
}
