import 'reflect-metadata';

import './controllers';

import { Bootstrap } from '@reactblog/node/annotation';
import { configure, resolve } from '@reactblog/core/annotations';
import { HttpService } from '@reactblog/node/services/http.service';
import { DatabusService } from '@reactblog/node/services/abstracts/databus.service';
import { RedisDatabusService } from '@reactblog/node/services/redis-databus.service';

@Bootstrap
export class SeoBootstrap {

  @resolve
  private readonly httpService: HttpService;

  @configure
  private databusService(): DatabusService {
    return new RedisDatabusService('SEO-SERVICE');
  }

  init () {
    this.databusService().listen();
    this.httpService.listen();
  }
}
