import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateIssueInput {


  @Field()
  @IsNotEmpty()
  title: string;



}
