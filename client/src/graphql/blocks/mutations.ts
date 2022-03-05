import { gql } from 'graphql-request';

export const CREATE_BLOCK = gql`
  mutation CreateBlock($createBlockInput: CreateBlockInput!) {
    createBlock(createBlockInput: $createBlockInput) {
      index
      parent {
        type
        id
      }
      type
      object
    }
  }
`