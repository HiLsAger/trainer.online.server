import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("CRM API")
    .setDescription("Api for application crm")
    .setVersion("0.0.1")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" },
      "Authorization",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Authorization, Content-Type, Accept",
  });

  await app.listen(3000, "0.0.0.0");
  console.log(`Сервер запущен на ${await app.getUrl()}`);
}
bootstrap();
