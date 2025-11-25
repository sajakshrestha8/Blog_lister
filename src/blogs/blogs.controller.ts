import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { BlogsService } from './blogs.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  createBlogs(@Body() payload: CreateBlogDTO) {
    return this.blogService.createBlog(payload);
  }

  @Roles(Role.USER)
  @Get()
  getData() {
    return 'get Information';
  }
}
