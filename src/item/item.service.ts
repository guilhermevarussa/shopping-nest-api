import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private readonly repository:
    Repository<Item>) {}
    
    create(CreateItemDto:CreateItemDto):Promise<Item>{
      const item = this.repository.create(CreateItemDto);
      return this.repository.save(item);
    }

    findAll():Promise<Item[]>{
      return this.repository.find();
    }

    findOne(id:string):Promise<Item>{
      return this.repository.findOne({ where: { id } });
    }

    async update(id:string,updateItemDto:UpdateItemDto):Promise<Item>{
      const item = await this.repository.preload({
        id:id,
        ...updateItemDto
      });
      if(!item){
        throw new Error(`Item ${id} not found`);
      }
      return this.repository.save(item);
    }
    
    async remove(id:string){
      const item = await this.findOne(id);
      return this.repository.remove(item);
    }
}
