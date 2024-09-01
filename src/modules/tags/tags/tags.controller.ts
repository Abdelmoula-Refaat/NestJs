import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.createTag(createTagDto);
  }

  @Get()
  async findAllTags() {
    return await this.tagsService.findAllTags();
  }

  @Get(':id')
  async findTagById(@Param('id') id: string) {
    return await this.tagsService.findTagById(id);
  }

  @Patch(':id')
  async updateTag(@Param('id') id: string, @Body() updateTagDto: CreateTagDto) {
    return await this.tagsService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: string) {
    await this.tagsService.deleteTag(id);
    return { message: 'Tag deleted successfully' };
  }
}
