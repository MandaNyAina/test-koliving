import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdsDto, UpdateAdsDto } from 'src/ads/dto/ads.dto';
import { Property, PropertyDocument } from 'src/ads/schemas/property.schema';
import { Room, RoomDocument } from 'src/ads/schemas/room.schema';
import { Tenant, TenantDocument } from 'src/tenants/schema/tenant.schema';
import { Ads, AdsDocument } from '../schemas/ads.schema';
import { Rent, RentDocument } from '../schemas/rent.schema';

@Injectable()
export class AdsService {
    constructor(
        @InjectModel(Ads.name)
        private adsModel: Model<AdsDocument>,
        @InjectModel(Property.name)
        private propertyModel: Model<PropertyDocument>,
        @InjectModel(Room.name)
        private roomModel: Model<RoomDocument>,
        @InjectModel(Rent.name)
        private rentModel: Model<RentDocument>,
        @InjectModel(Tenant.name)
        private tenantModel: Model<TenantDocument>,
    ) {}

    public async createAds(input: CreateAdsDto) {
        const rooms = [];
        await Promise.all(
            input.properties.rooms.map(async (room) => {
                const createdRoom = new this.roomModel(room);
                rooms.push((await createdRoom.save()).id);
            }),
        );

        const property = new this.propertyModel({
            ...input.properties,
            rooms,
        }).save();

        const createdAds = new this.adsModel({
            properties: (await property).id,
        });

        return createdAds.save();
    }

    public async updateAds(input: UpdateAdsDto) {
        const rooms = [];
        if (input.properties.rooms) {
            await Promise.all(
                input.properties.rooms?.map(async (room) => {
                    if (room._id) {
                        this.roomModel.findByIdAndUpdate(room._id, room).exec();
                    } else {
                        const createdRoom = new this.roomModel(room);
                        rooms.push((await createdRoom.save()).id);
                    }
                }),
            );
        }

        const current_rooms = (
            await this.propertyModel.findById(input.properties._id)
        ).rooms;
        const new_rooms = [...rooms, ...current_rooms];

        this.propertyModel
            .findByIdAndUpdate(input.properties._id, {
                ...input.properties,
                rooms: new_rooms,
            })
            .exec();

        if (input.rents) {
            const tenant = new this.tenantModel(input.rents.tenants);
            const tenant_id = (await tenant.save()).id;
            const rents = new this.rentModel({
                ...input.rents,
                tenants: tenant_id,
            });
            const rents_id = (await rents.save()).id;
            this.adsModel
                .findByIdAndUpdate(input._id, { rents: rents_id })
                .exec();
        }

        return this.adsModel.findById(input._id);
    }

    public async deleteAds(id: string) {
        await this.adsModel.findByIdAndDelete(id).exec();
        return id;
    }

    public async getAll(id?: string, id_rent?: string) {
        let model: any = this.adsModel.find();
        if (id) {
            model = this.adsModel.findById(id);
        }
        if (id_rent) {
            model = this.adsModel.where({ rents: id_rent });
        }
        return model
            .populate({
                path: 'properties',
                model: this.propertyModel,
                populate: {
                    path: 'rooms',
                    model: this.roomModel,
                },
            })
            .populate({
                path: 'rents',
                model: this.rentModel,
                populate: {
                    path: 'tenants',
                    model: this.tenantModel,
                },
            });
    }
}
