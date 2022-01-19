import { gql } from  'graphql-request';

const PageFragment = gql`
  fragment pageParts on Page {
    id
    name
    icon
    favorite
    hierarchy {
      root
      children
      parent
    }
  }
`;

export const GET_WORKSPACE = gql`
  ${PageFragment}
  query GetWorkspace {
    getWorkspace {
      private {...pageParts}
      favorites {...pageParts}
    }
  }
`;