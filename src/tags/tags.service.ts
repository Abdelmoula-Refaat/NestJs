import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  private tags = [];

  findAll() {
    return this.tags;
  }

  findOne(id: number) {
    const tag = this.tags.find(tag => tag.id === id);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  create(createTagDto: CreateTagDto) {
    const newTag = {
      id: this.tags.length + 1,
      ...createTagDto,
    };
    this.tags.push(newTag);
    return newTag;
  }

  update(id: number, updateTagDto: CreateTagDto) {
    const tag = this.findOne(id);
    if (tag) {
      tag.name = updateTagDto.name;
    }
    return tag;
  }

  remove(id: number) {
    const index = this.tags.findIndex(tag => tag.id === id);
    if (index === -1) {
      throw new NotFoundException('Tag not found');
    }
    this.tags.splice(index, 1);
  }
}
