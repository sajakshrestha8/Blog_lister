import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBlogDTO } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Post()
  createBlogs(@Body() payload: CreateBlogDTO) {
    console.log(payload);
    return 'blogs';
  }
}
