import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class Twosum {
  @IsArray()
  @ArrayMinSize(1, { message: 'Please input value in nums Array' })
  @IsNotEmpty({ message: 'Please provide Array nums' })
  nums: Array<number>;
  @IsNotEmpty({ message: 'Please provide target' })
  target: number;
}

export class ReturnTwosum {
  target: number;
  indexNums: number[];
  message: string;
}
