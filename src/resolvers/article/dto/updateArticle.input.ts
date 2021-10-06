import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput {
  @Field({ nullable: true })
  content?: string;
 
  @Field()
  @IsNotEmpty()
  id: string; 
  
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  timetoread?: number;

  @Field({ nullable: true })
  image?: string;


}
