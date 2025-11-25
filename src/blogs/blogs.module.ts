import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blogs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}
