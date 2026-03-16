import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app.module.js';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './main/docs/swagger.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://pwa.lilog.app',
      'http://localhost:5174',
    ], // permite todas as origens (pode substituir pelo domínio específico)
    credentials: true,
  });
  app.setGlobalPrefix('api');
  setupSwagger(app); // 2. Chame a função para configurar o Swagger
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
