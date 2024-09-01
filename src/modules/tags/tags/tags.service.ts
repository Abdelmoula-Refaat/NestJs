import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from 'src/core/schemas/tags.schema';
import { CreateTagDto } from './dto/tags.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = new this.tagModel(createTagDto);
    return await newTag.save();
  }

  async findAllTags(): Promise<Tag[]> {
    return await this.tagModel.find().exec();
  }

  async findTagById(id: string): Promise<Tag> {
    const tag = await this.tagModel.findById(id).exec();
    if (!tag) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }
    return tag;
  }

  async updateTag(id: string, updateTagDto: CreateTagDto): Promise<Tag> {
    const updatedTag = await this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true }).exec();
    if (!updatedTag) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }
    return updatedTag;
  }

  async deleteTag(id: string): Promise<void> {
    const result = await this.tagModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }
  }
}

