import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo : Repository<User>){
    }   
    create(email: string , password:string){
        const user = this.repo.create({email,password});
        return this.repo.save(user);
    }

    findOne(id: number){
        return this.repo.findOneBy({id : id});
    }

    find(){
        return this.repo.find();
    }

    findByEmail(email:string){
        return this.repo.findOneBy({email});
    }
    async remove(id: number){
        const User = await this.findOne(id);
        if(!User){
            throw new Error("user not found !");
        }
        return this.repo.remove(User) ;
    }

    async update(id: number , attrs:Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            throw new Error("user not Found");
        }
        Object.assign(user , attrs);
        return this.repo.save(user);
    }


}
