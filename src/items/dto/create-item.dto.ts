import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { CreateListingDto } from "./create-listing.dto"
import { Type } from "class-transformer"
import { type } from "os"
import { CreateTagDto } from "./create-tag.dto"
import { Tag } from "../entities"

export class CreateItemDto {
    @IsString()
    name : string 
   
    @IsNumber()
    price : number

    @ValidateNested()
    @Type(()=> CreateListingDto)
    listing : CreateListingDto

    @IsArray()
    @Type(()=> CreateTagDto)
    tags : Tag[]
}
