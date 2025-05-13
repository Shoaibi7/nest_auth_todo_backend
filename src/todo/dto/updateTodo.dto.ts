import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class updateTodoDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isComplete?: boolean;
}