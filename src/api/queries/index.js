import gql from 'graphql-tag';

export const GET_CATEGORIES_QUERY = gql`
    query category {
        category{
            name
            products {
                name
                inStock
                gallery
                description
                category
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
                prices {
                    currency
                    amount
                }
            }
        }
    }
`;

export const GET_CURRENCIES = gql`
    query {
        currencies
    }
`

