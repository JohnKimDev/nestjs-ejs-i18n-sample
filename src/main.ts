import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { I18n } from 'i18n';

async function bootstrap() {
  const i18n = new I18n();

  // https://github.com/mashpie/i18n-node#list-of-all-configuration-options
  i18n.configure({
    locales: ['en', 'fr', 'de'],
    directory:  join(__dirname, '..', 'i18n'),
    cookie: 'lang',
    defaultLocale: 'en',
    fallbacks: { nl: 'en' }
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.use(i18n.init);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
