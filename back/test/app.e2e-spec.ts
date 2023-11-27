import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient, Role } from '@prisma/client';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  const user = {
    firstname: 'Jack',
    lastname: 'Doe',
    email: 'recruiter@dev.fr',
    password: 'password',
    roles: [Role.RECRUITER],
  };
  const { password, ...userWithoutPassword } = user;

  function register() {
    return request(app.getHttpServer()).post('/auth/register').send(user);
  }

  function login(email: string, password: string) {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password });
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await prisma.$transaction([prisma.user.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('POST /auth/register', () => {
    return register()
      .expect(201)
      .expect((res) => {
        expect(res.body).not.toHaveProperty('password');
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            access_token: expect.any(String),
            ...userWithoutPassword,
          }),
        );
      });
  });

  it('POST /auth/login', async () => {
    await register();

    return login(user.email, user.password)
      .expect(201)
      .expect((res) => {
        expect(res.body).toStrictEqual(
          expect.objectContaining({
            access_token: expect.any(String),
          }),
        );
      });
  });
});

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  const user = {
    firstname: 'Jack',
    lastname: 'Doe',
    email: 'recruiter@dev.fr',
    password: 'password',
    roles: [Role.RECRUITER],
  };
  const { password, ...userWithoutPassword } = user;

  const updateDto = {
    firstname: 'John',
    lastname: 'Jonny',
    email: 'recruiter@dev.com',
  };

  const passwordDto = {
    password: user.password,
    newPassword: 'pass',
  };

  function register() {
    return request(app.getHttpServer()).post('/auth/register').send(user);
  }

  function login(email: string, password: string) {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password });
  }

  function updateCurrentUserInfo(token: string) {
    return request(app.getHttpServer())
      .patch('/users/current')
      .set('Authorization', `Bearer ${token}`)
      .send(updateDto);
  }

  function changeCurrentUserPassword(token: string) {
    return request(app.getHttpServer())
      .patch('/users/current')
      .set('Authorization', `Bearer ${token}`)
      .send(updateDto);
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await prisma.$transaction([prisma.user.deleteMany()]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Get /user/current', async () => {
    const registerResponse = await register().expect(201);

    return request(app.getHttpServer())
      .get('/users/current')
      .set('Authorization', `Bearer ${registerResponse.body.access_token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).not.toHaveProperty('password');
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            ...userWithoutPassword,
          }),
        );
      });
  });

  it('PATCH /users/current', async () => {
    const registerResponse = await register().expect(201);

    return updateCurrentUserInfo(registerResponse.body.access_token)
      .expect(200)
      .expect((res) => {
        expect(res.body).toStrictEqual(
          expect.objectContaining({
            id: expect.any(String),
            ...updateDto,
          }),
        );
      });
  });

  it('PATCH /users/current/edit-password', async () => {
    const registerResponse = await register().expect(201);

    return changeCurrentUserPassword(registerResponse.body.access_token).expect(
      200,
    );
  });
});
