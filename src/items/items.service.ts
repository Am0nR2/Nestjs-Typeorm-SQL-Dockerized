import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, Listing, Comment, Tag } from './entities';
import { CreateItemDto, UpdateItemDto } from './dto';

@Injectable()
export class ItemsService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Item)
    private readonly itemsRepository : Repository<Item>
  ){}

  async create(
    createItemDto: CreateItemDto
    ) : Promise<Item> {
      const listing = new Listing({
        ...createItemDto.listing,
        rating : 0
      })
      
      const tags = createItemDto.tags.map(tag => 
            new Tag(tag)
        )

      const item = new Item({
        ...createItemDto,
        comments : [],
        tags,
        listing,
      })
      return await this.entityManager.save(item)
    }

  async findAll() : Promise<Item[]> {
    return await this.itemsRepository.find()
  }

  async findOne(
    id: number
  ) : Promise<Item> {
    const item = await this.itemsRepository.findOne({
      where : {id},
      relations : {listing : true, comments : true, tags : true}
    })
    return item
  }

  async update(
    id: number, 
    updateItemDto: UpdateItemDto
  ) : Promise<Item> {
    return await this.entityManager.transaction(async (entityManager) => {
      const item = await this.itemsRepository.findOneBy({id})
      item.price = updateItemDto.price 
      item.name = updateItemDto.name
      const comments =updateItemDto.comments.map(comment => 
          new Comment(comment)
      ) 
      item.comments = comments
      return await this.entityManager.save(item)
    })
  }

  async remove(
    id: number
    ) : Promise<{msg: string}> {
      const item = await this.itemsRepository.findOneBy({id})
      await this.itemsRepository.delete(id)
      return {msg : "Item has been successfully deleted from our database..."}
    }
}
