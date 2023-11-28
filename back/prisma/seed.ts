import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import recipes from './recipes';

const prisma = new PrismaClient();

async function resetDB() {
  await prisma.user.deleteMany({});
  await prisma.recipe.deleteMany({});
}

async function insertUsers() {
  const hashedPassword = await bcrypt.hash('password', 10);
  await prisma.user.createMany({
    data: [
      {
        firstname: 'Jack',
        lastname: 'Doe',
        email: 'user1@dev.fr',
        password: hashedPassword,
        role: 'USER',
      },
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'user2@dev.fr',
        password: hashedPassword,
        role: 'USER',
      },
      {
        firstname: 'Sonia',
        lastname: 'Doe',
        email: 'user3@dev.fr',
        password: hashedPassword,
        role: 'USER',
      },
    ],
  });
}

async function insertRecipes() {
  await prisma.recipe.createMany({ data: recipes });
}

async function main() {
  await resetDB();
  await insertUsers();
  await insertRecipes();
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
