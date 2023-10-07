import {IsNumber, IsPositive , IsString, IsNotEmpty, IsOptional} from 'class-validator'
import { ReportType } from 'src/data';
import { Exclude, Expose } from 'class-transformer'
export class CreateReportDto{
    @IsNumber()
    @IsPositive()
    amount:number;

    @IsString()
    @IsNotEmpty()
    source:string
}

export class UpdateReportDto{
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount:number;

    @IsString()
    @IsNotEmpty()
    source:string
}

export class ReportResponseDto{
    id: string;
    source:string;
    amount:number;

    @Expose({name:"CreatedAt"})
    transformCreatedAt(){
        return this.created_at
    }

    @Exclude()
    created_at:Date;

    @Exclude()
    updated_at:Date;
    type:ReportType;

    constructor(partial : Partial<ReportResponseDto>){
        Object.assign(this, partial)
    }
}


export class UserDto{
    id: string;
    userName:string;
    email:string;
    password:string

    @Exclude()
    created_at:Date;

    @Exclude()
    updated_at:Date;

    constructor(partial : Partial<UserDto>){
        Object.assign(this, partial)
    }
}