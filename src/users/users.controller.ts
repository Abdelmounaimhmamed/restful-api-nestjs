import {Session, Controller , Body , Post ,Get, Param, Patch, Delete, UseInterceptors , ClassSerializerInterceptor } from '@nestjs/common';
import {createUserDtos}  from "./DTOS/create-user.dtos";
import { UsersService } from './users.service';
import {Serialize, SerializeInterceptor}  from "../interceptors/serialize.interceptor";
import { UserDtos } from './DTOS/user.dtos';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { CurrentUser } from './Decorators/Current-user.decorator';

@Controller('auth')
export class UsersController {
    
    constructor(
        private serviceUser:UsersService ,
        private AuthService: AuthService ){
    }

    @Post("/signout")
    logout(@Session() session){
        session = null ;
    }
    @Post("/who")
    // whoami(@Session() session){
    //     return this.serviceUser.findOne(session);
    // }
    whoami(@CurrentUser() user:User){
        return user;
    }
    
    @Post("/signup")
    async createUser(@Body() body : createUserDtos , @Session() session:any){
        const user = await  this.AuthService.SignUp(body.email , body.password);
        session = user.id;
      
        return user;
    }
    @Post("/signin")
    async authenticateUser(@Body() body  : createUserDtos, @Session() session:any){
        const user = await  this.AuthService.SignIn(body.email , body.password);
        session = user.id;
        console.log(session);
        return user;
    }


    @Serialize(UserDtos)
    @Get("/users")
    getUsers(){
        console.log(this.serviceUser.find().then((data) => {
            return data;
        }).then((res) => {
            console.log(res);
        }));
        return this.serviceUser.find();
    }

    @UseInterceptors(new SerializeInterceptor(UserDtos))
    @Get("/users/:id")
    async getOneUser(@Param("id") param:number){
        // const {id,email} = await  this.serviceUser.findOne(param);
        // return {id,email};
        const user = await this.serviceUser.findOne(param);
        return user;
    }

    @Patch("/users/:id")
    updateUSer(@Param("id") param:number,@Body() body:createUserDtos){
        return this.serviceUser.update(param,body);
    }
    @Delete("/users/:id")
    removeUser(@Param("id") param : number){
        return this.serviceUser.remove(param);
    }


}
