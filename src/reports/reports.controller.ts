import { Controller , Get , Post , Patch , Delete , Body , Param } from '@nestjs/common';
import {ReportsService} from "./reports.service";
import {validateReport } from "./reportsDtos/report-dtos";
import { updatedDto } from './reportsDtos/updatedDto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService:ReportsService){
        
    }
    
    @Get("/")
    getReports(){
        return this.reportService.findAll();
    }
    @Get("/:id")
    getOneReport(@Param("id") id:number){
        return this.reportService.findOneReport(id);
    }

    @Post("/")
    createOneReport(@Body() data:validateReport){
        return this.reportService.createReport(data.price);
    }
    @Delete("/:id")
    deleteReport(@Param("id") id:number){
        return this.reportService.deleteReport(id);
    }
    @Patch("/:id")
    updateReport(@Param("id") id:number ,@Body() body:updatedDto){
        return this.reportService.updateReport(id,body);
    }

}
