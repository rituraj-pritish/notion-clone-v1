import { gql } from 'graphql-request';

export const CREATE_PAGE = gql`
  mutation CreatePage(
    $createPageInput: CreatePageInput!
  ) {
    createPage(
      createPageInput: $createPageInput
    ) {
      id
      name
      icon
      hierarchy {
        root
        children
        parent
      }
    }
  }
`;

export const UPDATE_PAGE = gql`
   mutation CreatePage(
    $updatePageInput: UpdatePageInput!
  ) {
    updatePage(
      updatePageInput: $updatePageInput
    ) {
      id
      name
      icon
      hierarchy {
        root
        children
        parent
      }
    }
  }
`;

export const DELETE_PAGE = gql`
   mutation DeletePage(
    $id: String!
  ) {
    deletePage(
      id: $id
    )
  }
`;