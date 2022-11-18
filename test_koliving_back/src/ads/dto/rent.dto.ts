import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TenantDto, TenantDtoOutput } from 'src/tenants/dto/tenant.dto';

@InputType()
export class RentDto {
    @Field(() => String, { nullable: true })
    _id?: string;

    @Field(() => TenantDto)
    tenants: TenantDto;

    @Field(() => Number)
    rent_price: number;
}

@ObjectType()
export class RentDtoOutput {
    @Field(() => String)
    _id: string;

    @Field(() => TenantDtoOutput)
    tenants: TenantDtoOutput;

    @Field(() => Number)
    rent_price: number;
}
