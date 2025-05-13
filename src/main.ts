import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for React frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Enable if you're using cookies or authentication headers
  });
  
  // Enhanced ValidationPipe configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non-whitelisted properties
      forbidNonWhitelisted: true, // throw errors for non-whitelisted properties
      transform: true, // automatically transform payloads to DTO instances
    })
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Application is running on port ${port}`);
}
bootstrap().catch(err => {
  Logger.error('Failed to start application', err);
  process.exit(1);
});