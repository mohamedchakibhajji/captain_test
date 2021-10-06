import { ArticleResolver } from './article.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [ArticleResolver],
})
export class ArticleModule {}
