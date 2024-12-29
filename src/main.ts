import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set up Swagger
  const config = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('API documentation for the NestJS properties')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI will be available at /api endpoint
  
  // Call the seeder to insert fake data into the database
  const seederService = app.get(SeederService);
  await seederService.seed();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
