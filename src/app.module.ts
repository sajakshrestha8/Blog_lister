import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BlogsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blogs.sqlite',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController, BlogsController],
  providers: [AppService],
})
export class AppModule {}
