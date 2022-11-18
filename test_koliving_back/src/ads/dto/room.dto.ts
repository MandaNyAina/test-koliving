import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RoomDto {
    @Field(() => String, { nullable: true })
    _id?: string;

    @Field(() => String)
    title: string;

    @Field(() => Number)
    surfaces: number;

    @Field(() => [String])
    pictures: string[];
}

@ObjectType()
export class RoomDtoOutput {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    title: string;

    @Field(() => Number)
    surfaces: number;

    @Field(() => [String])
    pictures: string[];
}
