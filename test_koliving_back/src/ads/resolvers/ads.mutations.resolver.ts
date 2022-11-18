import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdsService } from '../services/ads.service';
import { AdsDtoOutput, CreateAdsDto, UpdateAdsDto } from '../dto/ads.dto';

@Resolver()
export class AdsMutationsResolver {
    constructor(private readonly adsService: AdsService) {}

    @Mutation(() => AdsDtoOutput)
    async createAds(@Args('input') input: CreateAdsDto) {
        return this.adsService.createAds(input);
    }

    @Mutation(() => AdsDtoOutput)
    async updateAds(@Args('input') input: UpdateAdsDto) {
        return this.adsService.updateAds(input);
    }

    @Mutation(() => String)
    async deleteAds(@Args('_id') id: string) {
        return this.adsService.deleteAds(id);
    }
}
