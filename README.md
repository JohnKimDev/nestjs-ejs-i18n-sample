<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<h2 align="center">Model-View-Controller</h2>
<h3 align="center">
with EJS and i18N integration sample codes
</h3>

## Description
This is simple example of using NestJS with EJS template. For EJS documentation, check out EJS CLI documentation page, [https://ejs.co/#docs](https://ejs.co/#docs)

NestJS official site has `Model-View-Controller` page with handlebar template ([link](https://docs.nestjs.com/techniques/mvc)), this codes is based on the same MVC sample code but using EJS instead.

## What is EJS and Why use it
EJS stands for embedded Javascript and is used in templates building Node app. EJS is an easy to use and easy to understand, simple templating engine.
It is good for building light HTML pages like an Email template or a PDF rendering page with NestJS. 

For a complex frontend pages, you may also want to look into using a more full-fledged framework like Angular, React or Vue. That said, for simple projects, or if you need a simple templating engine with server side codes, 
EJS will be a good option. 

**Only EJS tags, you need to know**:
- `<%=` – Escape the provided value, and output it to the template
- `<%-` – Output the provided value without escaping. It is advised you escape all HTML variables before rendering to prevent cross-site scripting (XSS) attacks
- `<%` – Perform control operations such as using a conditional or loop


## i18n internationalization 
This sample codes also include [i18n](https://www.npmjs.com/package/i18n) lightweight translation module.

Usage in an EJS page
```ejs
<%= __('Hello') %>
<%= __('Hello_%s', 'John') %>
```

For more i18n configuration, checkout [i18n Github page](https://github.com/mashpie/i18n-node)

### Dependency
This sample codes use 2 NPM modules in addition to core NestJS framework. 

- `yarn add ejs` https://www.npmjs.com/package/ejs
- `yarn add i18n` https://www.npmjs.com/package/i18n

---

### EJS Installation

```bash
yarn add ejs
```

### EJS Configurations
The only configuration you need is `setViewEngin` in `main.ts`. 
####/src/main.ts
```typescript
// ...
app.setViewEngine('ejs');
// ...
```

Create `/public` for static assets and `/views` folder and create EJS page(s)
```
+ /public +
|         |
|         + images +
|                  |
|                  + lightbulb.png
|
+ /views +
      |
      + simple.ejs
      + some-page.ejs
```



NestJS official [page](https://docs.nestjs.com/techniques/mvc) has a well-documented page about using handlebar template. The EJS usage is exactly same after setting view engine. You can use it as reference.
####/src/app.controller.ts
```typescript
@Get('/master')
@Render('simple')    // name of EJS file in /views folder ex) simple.ejs
ejs() {
  // return any values you want to pass to the EJS page
  return {
    message: 'Hello world!'
  };
}
```

####/src/views/simple.ejs
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Simple EJS Page</title>
</head>
<body>
<!-- Passing a string value from the controller (app.controller.ts) -->
<%= message%>

<!-- Static asset from the /public folder -->
<p><img src="/images/lightbulb.png" /></p>

<a href="/master">Go to EJS master page</a>
</body>
</html>
```

---

### i18n Installation

```bash
yarn add i18n
```

### i18n Configurations

####/src/main.ts

```typescript
// ...
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
   // ... 
  app.use(i18n.init);
```

Create `/i18n` folder with supported language JSON files
```
/i18n +
      |
      + de.json
      + en.json
      + fr.json
```

Format the JSON language file 
```json
{
  "Hello": "Hello",
  "Hello %s, how are you today?": "Hello %s, how are you today?"
}
```

### Final thought
If you have any suggestions, or questions, 

