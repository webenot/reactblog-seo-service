import { Length } from 'class-validator';

export class FilterDto {
  @Length(4, 20)
  q: string;
}
