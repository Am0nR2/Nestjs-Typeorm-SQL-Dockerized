import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AbstractEntity<T>{
    @PrimaryGeneratedColumn()
    id : number
    
    constructor(obj : Partial<T>){
        return Object.assign(this, obj)
    }
}