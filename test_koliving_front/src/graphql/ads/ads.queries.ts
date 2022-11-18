import { gql } from '@apollo/client';

export const LOAD_ADS = gql`
    query getAllAds($id_rent: String) {
        getAllAds (id_rent: $id_rent) {
            _id
            properties {
                _id
                title
                surfaces
                address
            }
            rents {
                _id
                tenants {
                    first_name
                    last_name
                    email
                }
                rent_price
            }
            createdAt
        }
    }
`;

export const LOAD_ADS_BY_ID = gql`
    query getAdsById($_id: String!) {
        getAdsById (_id: $_id) {
            _id
            properties {
                _id
                title
                surfaces
                address
                pictures
                rooms {
                    _id
                    title
                    pictures
                    surfaces
                }
            }
            rents {
                _id
                tenants {
                    _id
                    first_name
                    last_name
                    email
                }
                rent_price
            }
            createdAt
        }
    }
`;