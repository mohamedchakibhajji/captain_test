import { Field, ObjectType , } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Article } from './article.model';




@ObjectType()
export class Issue extends BaseModel {
  @Field({
    description: 'name of the issue',
  })
  title: string;
  @Field(() => [Article], { nullable: true })
  articles!: Article[]
  @Field({
    description: 'published or no',
  })
  published: boolean;
  @Field({
    description: 'archived or no',
  })
  archived: boolean;
}