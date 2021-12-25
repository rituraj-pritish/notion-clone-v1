import { gql } from 'graphql-request';

export const GET_PAGES = gql`
  query getPages() {
    getPages() {
      id
      name
    }
  }
`;