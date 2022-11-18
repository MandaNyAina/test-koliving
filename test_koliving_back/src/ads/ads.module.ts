import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from 'src/tenants/schema/tenant.schema';
import { AdsMutationsResolver } from './resolvers/ads.mutations.resolver';
import { AdsQueriesResolver } from './resolvers/ads.query.resolver';
import { Ads, AdsSchema } from './schemas/ads.schema';
import { Property, PropertySchema } from './schemas/property.schema';
import { Rent, RentSchema } from './schemas/rent.schema';
import { Room, RoomSchema } from './schemas/room.schema';
import { AdsService } from './services/ads.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Property.name,
                schema: PropertySchema,
            },
            {
                name: Rent.name,
                schema: RentSchema,
            },
            {
                name: Room.name,
                schema: RoomSchema,
            },
            {
                name: Ads.name,
                schema: AdsSchema,
            },
            {
                name: Tenant.name,
                schema: TenantSchema,
            },
        ]),
    ],
    providers: [AdsService, AdsMutationsResolver, AdsQueriesResolver],
    controllers: [],
})
export class AdsModule {}
