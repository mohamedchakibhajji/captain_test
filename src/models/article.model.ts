import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel } from './base.model';
import { Issue } from './issue-model';

@ObjectType()
export class Article extends BaseModel {
  title: string;
  content: string;
  published: boolean;
  author: User;
  timetoread: number;
  image: string;
  issue:Issue;
  archived:boolean;
}