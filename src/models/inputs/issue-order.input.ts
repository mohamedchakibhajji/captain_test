import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum IssueOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  title = 'title',
  articles= 'Articles',
  archived='archived',
  published= 'published'
}

registerEnumType(IssueOrderField, {
  name: 'IssueOrderField',
  description: 'issues by which articles connections can be ordered.',
});

@InputType()
export class IssueOrder extends Order {
  field: IssueOrderField;
}
