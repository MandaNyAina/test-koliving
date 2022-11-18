import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from './room.schema';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true })
export class Property {
    @Prop()
    title: string;

    @Prop()
    address: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] })
    rooms: Room[];

    @Prop()
    surfaces: number;

    @Prop()
    pictures: string[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
