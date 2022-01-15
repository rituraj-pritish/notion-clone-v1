import { gql } from  'graphql-request';

export const GET_PAGES = gql`
  query GetPages($ids: String!) {
    getPages(ids: $ids) {
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
  }
`;

export const GET_PAGE = gql`
  query GetPage($id: String!) {
    getPage(id: $id) {
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
  }
`;