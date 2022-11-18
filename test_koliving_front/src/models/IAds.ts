import { IProperty } from "./IProperty";
import { IRent } from "./IRent";

export interface IAds {
    _id?: string;
    properties: IProperty;
    rents?: IRent;
    createdAt?: Date;
}
