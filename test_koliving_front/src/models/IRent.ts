import { ITenant } from "./ITenant";

export interface IRent {
    _id?: string;
    tenant: ITenant;
    rent_price: number;
}