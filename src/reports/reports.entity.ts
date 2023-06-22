
import {AfterInsert, AfterUpdate , AfterRemove,Column , PrimaryGeneratedColumn , Entity} from "typeorm";


@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    price: number

    @AfterInsert()
    afterInsert(){
        console.log("report inserted !");
    }

    @AfterUpdate()
    afterupdate(){
        console.log("data updated  !");
    }

    @AfterRemove()
    afterRemove(){
        console.log("data removed !");
    }


}