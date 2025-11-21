import { IsString } from 'class-validator';

export class CreateBlogDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
