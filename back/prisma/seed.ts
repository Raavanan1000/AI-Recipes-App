import { PrismaClient, Recipe, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import recipes from './recipes';

const prisma = new PrismaClient();

async function resetDB() {
  await prisma.favouriteRecipe.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.recipe.deleteMany({});
}

async function insertUsers() {
  const hashedPassword = await bcrypt.hash('password', 10);
  const data = [
    {
      firstname: 'Jack',
      lastname: 'Doe',
      email: 'user1@dev.fr',
      password: hashedPassword,
      role: 'USER',
      allergis: ['milk', 'eggs', 'soy'],
    },
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'user2@dev.fr',
      password: hashedPassword,
      role: 'USER',
      allergis: ['fish', 'eggs', 'soy'],
    },
    {
      firstname: 'Sonia',
      lastname: 'Doe',
      email: 'user3@dev.fr',
      password: hashedPassword,
      role: 'USER',
      allergis: ['arugula', 'avocado', 'barberry'],
    },
  ];
  const users = [];

  for (const user of data) {
    users.push(
      await prisma.user.create({
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          role: 'USER',
          allergis: user.allergis,
        },
      }),
    );
  }

  return users;
}

async function insertRecipes() {
  const data = [];
  for (const recipe of recipes) {
    data.push(await prisma.recipe.create({ data: recipe }));
  }
  return data;
}

async function insertFavourites(users: User[], recipes: Recipe[]) {
  for (let i = 0; i < users.length; i++) {
    for (let j = i * 4; j < i * 4 + 4; j++) {
      await prisma.favouriteRecipe.create({
        data: {
          userId: users[i].id,
          recipeId: recipes[j].id,
        },
      });
    }
  }
}

async function main() {
  await resetDB();
  const users = await insertUsers();
  const data = await insertRecipes();
  await insertFavourites(users, data);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('error on seed ', e);
    await prisma.$disconnect();
    process.exit(1);
  });
