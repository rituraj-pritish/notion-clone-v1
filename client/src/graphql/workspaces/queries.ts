import { gql } from 'graphql-request';

export const GET_WORKSPACE = gql`
  query GetWorkspace {
    getWorkspace {
      pages {
        id
        name
        icon
      }
    }
  }
`;