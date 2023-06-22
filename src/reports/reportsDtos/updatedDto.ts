import {IsOptional , IsNumber} from "class-validator";


export class updatedDto {
    @IsNumber()
    @IsOptional()
    price: number

}