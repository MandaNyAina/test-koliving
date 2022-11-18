import { gql } from '@apollo/client';

export const CREATE_ADS = gql`
    mutation createAds($input: CreateAdsDto!) {
        createAds(input: $input) { _id }
    }
`;

export const UPDATE_ADS = gql`
    mutation updateAds($input: UpdateAdsDto!) {
        updateAds(input: $input) { _id }
    }
`;

export const DELETE_ADS = gql`
    mutation deleteAds ($id: String!) {
        deleteAds(_id: $id)
    }
`;