import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app.module.js';
import { setupSwagger } from './main/docs/swagger.config.js';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: true, // permite todas as origens (pode substituir pelo domínio específico)
    credentials: true,
  });
  app.setGlobalPrefix('api');
  setupSwagger(app); // 2. Chame a função para configurar o Swagger
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
