import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tenant } from 'src/tenants/schema/tenant.schema';

export type RentDocument = HydratedDocument<Rent>;

@Schema()
export class Rent {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' })
    tenants: Tenant;

    @Prop()
    rent_price: number;
}

export const RentSchema = SchemaFactory.createForClass(Rent);
