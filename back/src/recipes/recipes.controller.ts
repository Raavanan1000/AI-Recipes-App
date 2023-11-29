import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { LoggedInUser } from 'src/auth/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  searchRecipe(
    @Body() body: { query: string; considerAllergies: boolean },
    @LoggedInUser() user,
  ) {
    const { query, considerAllergies } = body;
    return this.recipesService.searchRecipe(user, query, considerAllergies);
  }

  @Get('season')
  async searchByCurrentSeason() {
    return await this.recipesService.searchByCurrentSeason();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }
}
