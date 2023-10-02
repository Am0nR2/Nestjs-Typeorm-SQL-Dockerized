import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "../../database/abstract-entity";
import { Listing, Comment } from ".";
import { Tag } from "./tag.entity";

@Entity()
export class Item extends AbstractEntity<Item> {
    @Column()
    name : string 

    @Column()
    price : number

    @OneToOne(()=> Listing, {cascade : true})
    @JoinColumn()
    listing : Listing

    @OneToMany(()=> Comment, comment => comment.item, {cascade : true})
    comments : Comment[]

    @ManyToMany(()=> Tag, {cascade : true,})
    @JoinTable()
    tags : Tag[]

}
