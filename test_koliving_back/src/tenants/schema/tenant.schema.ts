import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema()
export class Tenant {
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    email: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
