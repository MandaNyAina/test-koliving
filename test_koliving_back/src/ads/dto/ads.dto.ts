import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PropertyDto, PropertyDtoOutput } from './property.dto';
import { RentDto, RentDtoOutput } from './rent.dto';

@InputType()
export class CreateAdsDto {
    @Field(() => PropertyDto)
    properties: PropertyDto;

    @Field(() => RentDto, { nullable: true })
    rents?: RentDto;
}

@InputType()
export class UpdateAdsDto {
    @Field(() => String)
    _id: string;

    @Field(() => PropertyDto)
    properties: PropertyDto;

    @Field(() => RentDto, { nullable: true })
    rents?: RentDto;
}

@ObjectType()
export class AdsDtoOutput {
    @Field(() => String)
    _id: string;

    @Field(() => PropertyDtoOutput)
    properties: PropertyDtoOutput;

    @Field(() => RentDtoOutput, { nullable: true })
    rents?: RentDtoOutput;

    @Field(() => Date)
    createdAt?: Date;
}
