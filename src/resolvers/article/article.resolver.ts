import { PrismaService } from 'nestjs-prisma';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { PostIdArgs } from '../../models/args/post-id.args';
import { UserIdArgs } from '../../models/args/user-id.args';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { Article } from '../../models/article.model';
import { ArticleOrder } from '../../models/inputs/article-order.input';
import { ArticleConnection } from 'src/models/pagination/article-connection.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions/';
import { CreateArticleInput } from './dto/createArticle.input';
import { UserEntity } from 'src/decorators/user.decorator';
import { User } from 'src/models/user.model';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateArticleInput } from './dto/updateArticle.input';

const pubSub = new PubSub();

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Article)
  articleCreated() {
    return pubSub.asyncIterator('article');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Article)
  async createArticle(
    @UserEntity() user: User,
    @Args('data') data: CreateArticleInput
  ) {
    const newArticle = this.prisma.article.create({
      data: {
        published: false,
        title: data.title,
        content: data.content,
        authorId: user.id,
        timetoread: data.timetoread,
        image: data.image,
        archived:false
      },
    });
    pubSub.publish('articleCreated', { articleCreated: newArticle });
    return newArticle;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Article)
  async updateArticle(@Args('data') data: UpdateArticleInput) {

    const updatedArticle = this.prisma.article.update({
    
      data:data,
      where: {
        id: data.id,
      },
    });
    pubSub.publish('articleupdated', { articleUpdated: updatedArticle });
    return updatedArticle;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Article)
  async publishArticle(@Args('id') id: string) {

    const publishedArticle = this.prisma.article.update({
      data:{published:true},
      where: {
        id: id,
      },
    });
    pubSub.publish('articlePublished', { articlePublished: publishedArticle });
    return publishedArticle;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Article)
  async archiveArticle(@Args('id') id: string) {

    const articleArchived = this.prisma.article.update({
      data:{archived:true},
      where: {
        id: id,
      },
    });
    pubSub.publish('articleArchived', { articleArchived: articleArchived });
    return articleArchived;
  }


  
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Article)
  async includeArticleIssue(@Args('id') id: string , @Args('issue') issue: string) {

    const articleIncluded = this.prisma.article.update({
      data:{issueId:issue},
      where: {
        id: id,
      },
    });
    pubSub.publish('articleIncluded', { articleIncluded: articleIncluded });
    return articleIncluded;
  }


  @UseGuards(GqlAuthGuard)
  @Mutation(() => Article)
  async removeArticleIssue(@Args('id') id: string) {

    const articleremoved = this.prisma.article.update({
      data:{issueId:null},
      where: {
        id: id,
      },
    });
    pubSub.publish('articleremoved', { articleremoved: articleremoved });
    return articleremoved;
  }


 

 
}
