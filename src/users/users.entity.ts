import {AfterInsert , AfterRemove , AfterUpdate, Entity , Column , PrimaryGeneratedColumn} from "typeorm"
import { Exclude } from "class-transformer";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number ;
    
    @Column()
    email: string ;

    @Column()
    // @Exclude() // this wil exclude the password from being sent to the response . 
    password : string;


    @AfterInsert()
    afterInsert(){
        console.log("user is insertered with this is :"+ this.id);
    }

    @AfterRemove()
    afterRemove(){
        console.log("user removed with this is :"+this.id);
    }

    @AfterUpdate()
    afterUPdate(){
        console.log("user updated with id "+this.id);
    }


    

}