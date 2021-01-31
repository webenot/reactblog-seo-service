import 'reflect-metadata';

import './controllers';

import { Bootstrap } from '@reactblog/node/annotation';
import { resolve } from '@reactblog/core/annotations';
import { HttpService } from '@reactblog/node/services/http.service';

@Bootstrap
export class SeoBootstrap {

  @resolve
  private readonly httpService: HttpService;

  init () {
    this.httpService.listen();
  }
}
