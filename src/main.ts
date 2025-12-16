import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // CORS: allow Vercel + local dev
    app.enableCors({
        origin: ['https://fp-frontend-two.vercel.app'], // domain Vercel frontend
        credentials: true,
    });


    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    // Static files (uploads)
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`Server running on port ${port}`);
}

bootstrap();
