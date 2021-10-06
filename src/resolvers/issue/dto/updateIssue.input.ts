import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateIssueInput {
 
  @Field()
  @IsNotEmpty()
  id: string; 
  
  @Field({ nullable: true })
  title?: string;


}
