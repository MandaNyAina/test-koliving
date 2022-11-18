import { Args, Query, Resolver } from '@nestjs/graphql';
import { AdsDtoOutput } from '../dto/ads.dto';
import { AdsService } from '../services/ads.service';

@Resolver()
export class AdsQueriesResolver {
    constructor(private readonly adsService: AdsService) {}

    @Query(() => [AdsDtoOutput])
    async getAllAds(@Args('id_rent', { nullable: true }) id_rent: string) {
        return this.adsService.getAll(undefined, id_rent);
    }

    @Query(() => AdsDtoOutput, { nullable: true })
    async getAdsById(@Args('_id') id: string) {
        return this.adsService.getAll(id);
    }
}
