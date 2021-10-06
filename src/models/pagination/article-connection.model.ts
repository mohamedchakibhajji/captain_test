import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Article } from '../article.model';

@ObjectType()
export class ArticleConnection extends PaginatedResponse(Article) {}
