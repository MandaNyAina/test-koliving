import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TenantDto, TenantDtoOutput } from '../dto/tenant.dto';
import { TenantsService } from '../service/tenants.service';

@Resolver()
export class TenantMutationResolver {
    constructor(private readonly tenantService: TenantsService) {}

    @Mutation(() => TenantDtoOutput)
    public async createTenant(@Args('input') input: TenantDto) {
        return this.tenantService.createTenant(input);
    }

    @Mutation(() => TenantDtoOutput, { nullable: true })
    public async updateTenant(@Args('input') input: TenantDto) {
        return this.tenantService.updateTenant(input);
    }

    @Mutation(() => String)
    public async deleteTenant(@Args('_id') id: string) {
        return this.tenantService.deleteTenant(id);
    }

    @Mutation(() => String)
    public async attachTenantToAd(
        @Args('ad_id') ad_id: string,
        @Args('tenant_id') tenant_id: string,
        @Args('rent_price') rent_price: number,
    ) {
        return this.tenantService.attachTenantToAd(
            ad_id,
            tenant_id,
            rent_price,
        );
    }
}
