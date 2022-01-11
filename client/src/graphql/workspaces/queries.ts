import { gql } from 'graphql-request';

export const GET_WORKSPACE = gql`
  query GetWorkspace {
    getWorkspace {
      id
      name
      icon
      hierarchy {
        root
        children
      }
    }
  }
`;