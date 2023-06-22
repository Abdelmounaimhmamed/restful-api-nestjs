// called serialize beacuse it gonna take an object and serialize it evently in a json . 

import { UseInterceptors, NestInterceptor , ExecutionContext , CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {  plainToClass } from "class-transformer";
import { UserDtos } from "src/users/DTOS/user.dtos";


export function Serialize(dto:any){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto : any){

    }

    intercept(context: ExecutionContext, next: CallHandler<any>) : Observable<any>  {
        // runs something before a request is handled ! 
        // by the requests handler . 
        // console.log("im running before the handler !", context);

        return next.handle().pipe(
            map((data:any | never ) => {
                // run something before the resposne is sent out  
                // console.log("im running before the response is sent out ",data);

                return plainToClass(this.dto,data , { 
                    excludeExtraneousValues : true
                });
            })
        );
    }  

}