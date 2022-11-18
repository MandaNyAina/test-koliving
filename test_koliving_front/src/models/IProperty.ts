import { IRoom } from "./IRoom";

export interface IProperty {
    _id: string;
    title: string;
    address: string;
    rooms: IRoom[];
    surfaces: number;
    pictures: string[];
}