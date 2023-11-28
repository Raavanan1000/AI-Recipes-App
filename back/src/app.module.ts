import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import validationSchema from './config/validation';
import { UsersModule } from './users/users.module';
import { FavouritesModule } from './favourites/favourites.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: validationSchema,
    }),
    UsersModule,
    AuthModule,
    FavouritesModule,
    RecipesModule,
  ],
})
export class AppModule {}
