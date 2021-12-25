import { gql } from 'graphql-request';

export const GET_PAGES = gql`
  query GetPage($id: String!) {
    getPage(id: $id) {
      id
      name
      icon
    }
  }
`;