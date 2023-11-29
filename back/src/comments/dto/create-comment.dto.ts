import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment;

  @IsUUID()
  recipeId;
}
