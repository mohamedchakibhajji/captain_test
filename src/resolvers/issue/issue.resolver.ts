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
import { Issue } from '../../models/issue-model';
import { IssueOrder } from '../../models/inputs/issue-order.input';
import { IssueConnection } from 'src/models/pagination/issue-connection.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions/';
import { CreateIssueInput } from './dto/createIssue.input';
import { UserEntity } from 'src/decorators/user.decorator';
import { User } from 'src/models/user.model';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateIssueInput } from './dto/updateIssue.input';
import { IssueIdArgs } from 'src/models/args/issue-id.args';

const pubSub = new PubSub();

@Resolver(() => Issue)
export class IssueResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Issue)
  issueCreated() {
    return pubSub.asyncIterator('issue');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Issue)
  async createIssue(
    @Args('data') data: CreateIssueInput
  ) {
    const newIssue= this.prisma.issue.create({
      data: {
        published: false,
        title: data.title,
        archived:false
      },
    });
    pubSub.publish('IssueCreated', { issueCreated: newIssue });
    return newIssue;
  }



  @UseGuards(GqlAuthGuard)
  @Mutation(() => Issue)
  async publishIssue(@Args('id') id: string) {

    const publishedIssue = this.prisma.issue.update({
      data:{published:true},
      where: {
        id: id,
      },
    });
    pubSub.publish('issuePublished', { issuePublished: publishedIssue });
    return publishedIssue;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Issue)
  async archiveIssue(@Args('id') id: string) {

    const issueArchived = this.prisma.issue.update({
      data:{archived:true},
      where: {
        id: id,
      },
    });
    pubSub.publish('issueArchived', { issueArchived: issueArchived });
    return issueArchived;
  }



  @Query(() => IssueConnection)
  async getArticles(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => IssueOrder,
      nullable: true,
    })
    orderBy: IssueOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.article.findMany({
          include: { author: true },
          where: {
            published: true,
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.article.count({
          where: {
            published: true,
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }

  @Query(() => [Issue])
  issueArticles(@Args() Issue: IssueIdArgs) {
    return this.prisma.issue
      .findMany({ where: {id:Issue.issueId} ,  include: {
        articles: true
       }}  );
    // or
    // return this.prisma.posts.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }



}
