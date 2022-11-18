import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Property } from './property.schema';
import { Rent } from './rent.schema';

export type AdsDocument = HydratedDocument<Ads>;

@Schema({ timestamps: true })
export class Ads {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Property' })
    properties: Property;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Rent' })
    rents?: Rent;

    @Prop()
    createdAt?: Date;
}

export const AdsSchema = SchemaFactory.createForClass(Ads);
