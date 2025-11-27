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
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/Roles/roles.guard';
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
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  createBlogs(@Body() payload: CreateBlogDTO) {
    return this.blogService.createBlog(payload);
  }

  @Roles(Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  getData() {
    return this.blogService.getAllBlog();
  }
}
