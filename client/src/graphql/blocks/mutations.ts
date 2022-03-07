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
      object {
        text
        styles {
          offset
          length
          style
        }
      }
    }
  }
`

export const UPDATE_BLOCK = gql`
  mutation UpdateBlock($updateBlockInput: UpdateBlockInput!) {
    updateBlock(updateBlockInput: $updateBlockInput) {
      id
      index
      parent {
        type
        id
      }
      type
      object {
        text
        styles {
          offset
          length
          style
        }
      }
    }
  }
`