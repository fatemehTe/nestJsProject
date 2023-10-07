import { Injectable } from "@nestjs/common";
import { ReportType,data, user } from "./data";
import {v4 as uuid} from 'uuid'
import { ReportResponseDto, UserDto } from "./dto/report.dto";

interface reportData{
  amount:number, source:string
}

interface userData{
  userName:string, email:string, password:string
}

interface UpdateReportData{
  amount?:number, source?:string
}


@Injectable()
export class AppService{
  getAllReports(type:ReportType):ReportResponseDto[]{
    return data.report.filter((report)=>report.type === type)
    .map(report=>new ReportResponseDto(report))
  }

  getReportById(type:ReportType ,id:string):ReportResponseDto{
    const report =  data.report
    .filter((report)=>report.type === type)
    .find((report)=>report.id === id)

    if(!report) return
    return new ReportResponseDto(report)
  }

  createReport(type: ReportType, {amount, source} :reportData):ReportResponseDto{
    const newReport = {
      id: uuid(),
      source: source,
      amount: amount,
      created_at: new Date(),
      updated_at: new Date(),
      type : type
    }
    data.report.push(newReport)
    return new ReportResponseDto(newReport)
    // return {
    //   id: newReport.id,
    //   source: newReport.source,
    //   amount: newReport.amount,
    //   createdAt: newReport.created_at,
    //   type: newReport.type
    // }
  }

  putReport(
    type:ReportType, id:string, body:reportData
  ):ReportResponseDto{
    const reportType = type === 'income'?ReportType.INCOME:ReportType.EXPENSE
    const reportToUpdate =  data.report
    .filter((report)=>report.type === reportType)
    .find((report)=>report.id === id)

    if(!reportToUpdate) return

    const reportIndex = data.report.findIndex((report)=>report.id === reportToUpdate.id)
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    }
    // return data.report[reportIndex]
    return new ReportResponseDto(data.report[reportIndex])
  }

  deleteReport(
    id:string
  ){
    const reportIndex = data.report.findIndex((report)=>report.id === id)
    if(reportIndex === -1)return
    data.report.splice(reportIndex,1)
  }

  //___________________________________________USERS
  getAllUsers():UserDto[]{
    return user.user
  }

  findUser(userName:string, password:string):UserDto{
    return user.user
    .filter((u)=>u.userName === userName)
    .find((u)=>u.password === password)
  }

  createUser({userName, email, password}:userData):UserDto{
    const newUser = {
      id: uuid(),
      userName: userName,
      email: email,
      created_at: new Date(),
      updated_at: new Date(),
      password : password
    }
    user.user.push(newUser)
    return new UserDto(newUser)
  }
}