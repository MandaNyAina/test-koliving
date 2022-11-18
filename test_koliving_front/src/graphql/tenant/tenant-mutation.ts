import { gql } from '@apollo/client';

export const CREATE_TENANT = gql`
    mutation createTenant($input: TenantDto!) {
        createTenant(input: $input) { _id }
    }
`;

export const UPDATE_TENANT = gql`
    mutation updateTenant($input: TenantDto!) {
        updateTenant(input: $input) { _id }
    }
`;

export const DELETE_TENANT = gql`
    mutation deleteTenant ($_id: String!) {
        deleteTenant(_id: $_id)
    }
`;

export const ATTACH_TENANT = gql`
    mutation attachTenantToAd($ad_id: String!, $tenant_id: String!, $rent_price: Float!) {
        attachTenantToAd(ad_id: $ad_id, tenant_id: $tenant_id, rent_price: $rent_price)
    }
`;