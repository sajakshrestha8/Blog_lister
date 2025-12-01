import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { BlogsService } from './blogs.service';
import { Roles } from 'src/Roles/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/Roles/roles.guard';

@UseGuards(AuthGuard, RoleGuard)
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
  @Post()
  createBlogs(@Body() payload: CreateBlogDTO) {
    return this.blogService.createBlog(payload);
  }

  @Roles(Role.USER)
  @Get()
  getData() {
    return this.blogService.getAllBlog();
  }

  @Roles(Role.USER)
  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(+id);
  }
}
