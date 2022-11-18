import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RoomDto, RoomDtoOutput } from './room.dto';

@InputType()
export class PropertyDto {
    @Field(() => String, { nullable: true })
    _id?: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    address: string;

    @Field(() => [RoomDto])
    rooms: RoomDto[];

    @Field(() => Number)
    surfaces: number;

    @Field(() => [String])
    pictures: string[];
}

@ObjectType()
export class PropertyDtoOutput {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    address: string;

    @Field(() => [RoomDtoOutput])
    rooms: RoomDtoOutput[];

    @Field(() => Number)
    surfaces: number;

    @Field(() => [String])
    pictures: string[];
}
