import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFavouriteDto {
  @IsNotEmpty()
  @IsUUID()
  recipeId: string;
}
