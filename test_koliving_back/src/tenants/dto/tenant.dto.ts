import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RentDtoOutput } from 'src/ads/dto/rent.dto';

@InputType()
export class TenantDto {
    @Field(() => String, { nullable: true })
    _id?: string;

    @Field(() => String)
    first_name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String)
    email: string;
}

@ObjectType()
export class TenantDtoOutput {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    first_name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String)
    email: string;

    @Field(() => RentDtoOutput, { nullable: true })
    rents?: RentDtoOutput;
}
