import {IsNumber} from "class-validator";



export class validateReport  {
    @IsNumber()
    id: number
    
    @IsNumber()
    price : number


}

