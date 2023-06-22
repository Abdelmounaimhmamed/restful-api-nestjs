import {
    NestInterceptor,
    ExecutionContext ,
    CallHandler,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from '../users.service';

export class CurrentUserInteceptor  implements NestInterceptor {

    constructor(private UsersServices:UsersService){

    }

    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request = context.switchToHttp().getRequest();
        const userId = 2 ;
        if(userId){
            const user = await this.UsersServices.findOne(userId);
            if(user){
                request.CurrentUser = user;
                return request.CurrentUser;
            }
            throw new NotFoundException("User not found");
        }
        return next.handle();

    }


}