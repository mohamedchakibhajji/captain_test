import { IssueResolver } from './issue.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [IssueResolver],
})
export class IssueModule {}
