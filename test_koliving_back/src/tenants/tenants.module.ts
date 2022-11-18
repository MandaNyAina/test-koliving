import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ads, AdsSchema } from 'src/ads/schemas/ads.schema';
import { Rent, RentSchema } from 'src/ads/schemas/rent.schema';
import { TenantMutationResolver } from './resolvers/tenant.mutation.resolver';
import { TenantQueriesResolver } from './resolvers/tenant.query.resolver';
import { Tenant, TenantSchema } from './schema/tenant.schema';
import { TenantsService } from './service/tenants.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Tenant.name,
                schema: TenantSchema,
            },
            {
                name: Ads.name,
                schema: AdsSchema,
            },
            {
                name: Rent.name,
                schema: RentSchema,
            },
        ]),
    ],
    controllers: [],
    providers: [TenantsService, TenantMutationResolver, TenantQueriesResolver],
})
export class TenantsModule {}
