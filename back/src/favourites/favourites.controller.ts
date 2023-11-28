import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { LoggedInUser } from 'src/auth/decorator/user.decorator';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { FavouritesService } from './favourites.service';

@UseGuards(AuthGuard('jwt'))
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post()
  async create(
    @Body() createFavouriteDto: CreateFavouriteDto,
    @LoggedInUser() user,
  ) {
    return await this.favouritesService.create(
      createFavouriteDto.recipeId,
      user.id,
    );
  }

  @Get()
  async findUserFavourites(@LoggedInUser() user) {
    return await this.favouritesService.findAllByUserId(user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.favouritesService.remove(id);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
