import {Controller, Get, Post, Delete, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe} from "@nestjs/common"
import { ReportType } from 'src/data';
import { AppService } from "./app.service";
import { CreateReportDto, UpdateReportDto, ReportResponseDto, UserDto } from './dto/report.dto'

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService:AppService){}

  @Get('')
  getIncomeReport(
    @Param("type",new ParseEnumPipe(ReportType)) type:ReportType
  ):ReportResponseDto[]{
    return this.appService.getAllReports(type)
  }

  @Get(':id')
  getIncomeReportById(
    @Param('type',new ParseEnumPipe(ReportType)) type:ReportType,
    @Param('id', ParseUUIDPipe) id:string
  ):ReportResponseDto{
    return this.appService.getReportById(type, id)
  }

  @Post()
  postIncome(
    @Body() {amount, source}:{amount:number, source:string},
    @Param("type",new ParseEnumPipe(ReportType)) type:ReportType
  ):ReportResponseDto{
    const reportType = type === 'income'?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.createReport(reportType, {amount, source})
  }

  @Put(':id')
  putReport(
    @Param("type",new ParseEnumPipe(ReportType)) type:ReportType,
    @Param("id", ParseUUIDPipe) id:string,
    @Body() body:UpdateReportDto
  ):ReportResponseDto{
   return this.appService.putReport(type, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id:string
  ){
    return this.appService.deleteReport(id)
  }
  
}

@Controller('users')
export class UserController {
  constructor(private readonly appService:AppService){}

  @Get('')
  getUsers():UserDto[]{
    return this.appService.getAllUsers()
  }

  @Get(':userName/:password')
  findUser(
    @Param("userName") userName:string,
    @Param("password") password:string
    ){
    return this.appService.findUser(userName,password);
  }

  @Post('')
  postUser(
    @Body() {userName, email, password}:{userName:string, email:string, password:string}
  ):UserDto{
    return this.appService.createUser({userName, email, password})
  }
}