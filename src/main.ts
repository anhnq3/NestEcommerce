import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(`Quang Anh's Ecommerce`)
    .setDescription('The ecommerce system')
    .setVersion('1.0.0')
    .addTag('Users')
    .addTag('Auth')
    .addTag('Category')
    .addTag('Product')
    .addTag('Flash sale')
    .addTag('Voucher')
    .addTag('Order')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
