import { gql } from 'graphql-request';

export const PAGE_FRAGMENT = gql`
  fragment pageFragment on Page {
    id
    name
    icon
    favorite
    hierarchy {
      root
      children
      parent
    }
    deletedAt
    createdAt
    updatedAt
  }
`;