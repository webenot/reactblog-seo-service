import { Controller, endpoint, value } from '@reactblog/node/annotation';
import { FilterDto } from 'src/dto/filter.dto';

@Controller()
export class SeoController {

  @endpoint('GET /api/seo')
  all (@value('query') query: FilterDto) {
    console.log(query);
    return 'SeoController all';
  }
}
