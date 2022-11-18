import { Args, Query, Resolver } from '@nestjs/graphql';
import { TenantDtoOutput } from '../dto/tenant.dto';
import { TenantsService } from '../service/tenants.service';

@Resolver()
export class TenantQueriesResolver {
    constructor(private readonly adsService: TenantsService) {}

    @Query(() => [TenantDtoOutput])
    async getAllTenant() {
        return this.adsService.getAllTenants();
    }

    @Query(() => TenantDtoOutput)
    async getTenantById(@Args('_id') id: string) {
        return this.adsService.getAllTenants(id);
    }
}
