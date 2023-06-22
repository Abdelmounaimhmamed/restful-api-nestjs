import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import { UsersService } from './users.service';
import {randomBytes , scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import { NotFoundError } from "rxjs";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private usersService:UsersService ){

    }

    async SignUp(email:string , password:string){
        // see if the user exst  with the email
      const user = await  this.usersService.findByEmail(email); 
      if(user){
        throw new BadRequestException("User already exist in the database !");
      }
      // hash the user password  
      // generates the salt : 
        const salt = randomBytes(8).toString("hex");
      // hash the password and the salt together 
      const hash = (await scrypt(password , salt, 32)) as Buffer;

      // join the hashed result 
      const result = salt + "."+ hash;
      // create a new user and save it 
      const newUser = this.usersService.create(email,result);
      // return the user 
      return newUser;
    }


    async SignIn(email:string , password:string){
        // find the user with this email 
        const user = await this.usersService.findByEmail(email); 
        if(!user){
            throw new NotFoundException("user not found") ;
        }
        const salt = user.password.split(".")[0];
        const hash = user.password.split(".")[1];
        // we will hash the password again and see if the hashed output come belong the same as the hashed in the databse 
        const hash2 = (await scrypt(password , salt , 32)) as Buffer;
        const result = salt +"."+hash2;
        if(result === user.password){
            return user;
        }
        throw new NotFoundException("user not found with this pass");
    }
}