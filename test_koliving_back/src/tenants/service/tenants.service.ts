import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ads, AdsDocument } from 'src/ads/schemas/ads.schema';
import { Rent, RentDocument } from 'src/ads/schemas/rent.schema';
import { TenantDto } from '../dto/tenant.dto';
import { Tenant, TenantDocument } from '../schema/tenant.schema';

@Injectable()
export class TenantsService {
    constructor(
        @InjectModel(Ads.name)
        private adsModel: Model<AdsDocument>,
        @InjectModel(Tenant.name)
        private tenantModel: Model<TenantDocument>,
        @InjectModel(Rent.name)
        private rentModel: Model<RentDocument>,
    ) {}

    public async createTenant(input: TenantDto) {
        const new_tenant = new this.tenantModel(input);
        return new_tenant.save();
    }

    public async getAllTenants(id?: string) {
        let model: any = await this.tenantModel.aggregate([
            {
                $lookup: {
                    from: 'rents',
                    localField: '_id',
                    foreignField: 'tenants',
                    as: 'rents',
                },
            },
            { $set: { rents: { $first: '$rents' } } },
        ]);
        if (id) {
            model = model.find((el) => el._id == id);
        }
        return model;
    }

    public async updateTenant(input: TenantDto) {
        const updated_tenant = this.tenantModel.findByIdAndUpdate(
            input._id,
            input,
        );
        return updated_tenant.exec();
    }

    public async deleteTenant(id: string) {
        await this.tenantModel.findByIdAndDelete(id).exec();
        return id;
    }

    private deleteCurrentAssignation = async (
        tenant_id: string,
        ad_id: string,
    ) => {
        await this.rentModel.find({ tenants: tenant_id }).deleteOne().exec();
        const current_rent = (await this.adsModel.findById(ad_id)).rents;
        await this.rentModel.find({ _id: current_rent }).deleteOne().exec();
    };

    public async attachTenantToAd(
        ad_id: string,
        tenant_id: string,
        rent_price: number,
    ) {
        await this.deleteCurrentAssignation(tenant_id, ad_id);
        const rent = new this.rentModel({
            tenants: tenant_id,
            rent_price,
        }).save();
        await this.adsModel
            .findByIdAndUpdate(ad_id, { rents: (await rent).id })
            .exec();
        return tenant_id;
    }
}
