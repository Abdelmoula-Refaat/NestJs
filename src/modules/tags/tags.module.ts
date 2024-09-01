import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsController } from './tags/tags.controller';
import { TagsService } from './tags/tags.service';
import { Tag, TagSchema } from 'src/core/schemas/tags.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
