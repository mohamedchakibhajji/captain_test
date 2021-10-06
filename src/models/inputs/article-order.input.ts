import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum ArticleOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  title = 'title',
  content = 'content',
  author= 'User',
  timetoread= 'timetoread',
  image= 'image',
  issueid="issueid",
  archived="archived"
}

registerEnumType(ArticleOrderField, {
  name: 'ArticleOrderField',
  description: 'Articles by which post connections can be ordered.',
});

@InputType()
export class ArticleOrder extends Order {
  field: ArticleOrderField;
}
