import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function generatePrismaClient() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error generating Prisma Client:', error);
    throw error;
  }
}

async function bootstrap() {

  if (process.env.PRISMA_GENERATE_ON_BUILD === 'true') {
    await generatePrismaClient();
    console.log('Prisma Client generation successful.');
  }

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('ToDo List API')
      .setDescription('API for managing tasks in a ToDo List')
      .setVersion('1.0')
      .addTag('todo')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();