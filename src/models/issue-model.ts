import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel } from './base.model';
import { Article } from './article.model';

@ObjectType()
export class Issue extends BaseModel {
  title: string;
  articles: Article[];
  published: boolean;
  archived: boolean;
}