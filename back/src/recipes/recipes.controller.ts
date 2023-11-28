import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  searchRecipe(@Body() body: { query: string }) {
    const { query } = body;
    return this.recipesService.searchRecipe(query);
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
