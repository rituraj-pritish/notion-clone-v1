import { gql } from 'graphql-request';

// export const CREATE_PAGE = gql`
//   mutation CreatePage(
//     $name: String!, 
//     $icon: String, 
//     $parent: String, 
//     $children: [String]
//   ) {
//     createPage(
//       name: $name, 
//       icon: $icon, 
//       parent: $parent, 
//       children: $children
//     ) {
//       id
//       name
//       icon
//     }
//   }
// `;

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
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation UpdatePage(
    $id: ID!,
    $name: String!, 
    $icon: String, 
    $parent: String, 
    $children: [String]
  ) {
    UpdatePage(
      id: $id,
      name: $name, 
      icon: $icon, 
      parent: $parent, 
      children: $children
    ) {
      id
      name
    }
  }
`;