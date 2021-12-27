import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('simple')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('/master')
  @Render('master')
  ejs() {
    return {
      message: 'Hello world!',
      username: 'Stranger',
      date: (new Date()).toISOString().split('T')[0],
      numbers: [...Array(10).keys()]
    };
  }

}
