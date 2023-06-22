import { Injectable } from '@nestjs/common';
import { Report } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repo:Repository<Report>){}

    findOneReport(id: number){
        const report =  this.repo.findOneBy({id});
        return report;
    }

    findAll(){
        const dataReturned = this.repo.find();
        return dataReturned;
    }   

    createReport(price: number){ 
        const data = this.repo.create({price});
        return this.repo.save(data);
    }

    async deleteReport(id: number){
        const report = await this.findOneReport(id);
        !report &&  {message :  "user not found" !}
        return this.repo.remove(report);
    }

    async updateReport(id:number , attrs:Partial<Report>){
        const report = await this.findOneReport(id);
        if(!report)  throw new Error("report not found try again !");
        Object.assign(report , attrs);
        return this.repo.save(report);
    }
    
}
