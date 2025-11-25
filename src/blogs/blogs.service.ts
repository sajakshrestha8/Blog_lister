import { Body, Injectable } from '@nestjs/common';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { Blog } from './blogs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}
  async createBlog(@Body() data: CreateBlogDTO) {
    const blog = this.blogRepository.create(data);
    return await this.blogRepository.save(blog);
  }
}
