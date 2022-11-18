import { gql } from '@apollo/client';

export const LOAD_TENANT = gql`
    query {
        getAllTenant {
            _id
            first_name
            last_name
            email
            rents {
                _id
                rent_price
            }
        }
    }
`;

export const LOAD_TENANT_BY_ID = gql`
    query getById($_id: String!) {
        getTenantById(_id: $_id) {
            _id
            first_name
            last_name
            email
            rents {
                _id
                rent_price
            }
        }
    }
`;