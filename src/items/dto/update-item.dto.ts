import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateCommentDto } from "./create-comment.dto";

export class UpdateItemDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name : string
    
    @IsOptional()
    @IsNumber()
    price : number

    @IsArray()
    @ValidateNested()
    @Type(()=> CreateCommentDto)
    comments : CreateCommentDto[]

}
