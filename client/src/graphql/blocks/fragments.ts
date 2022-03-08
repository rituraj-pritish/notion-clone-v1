import { gql } from 'graphql-request';

export const BLOCK_FRAGMENT = gql`
  fragment blockFragment on Block {
    id
    order
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
    lastEdited {
      user {
        name
      }
      time
    }
    created {
      user {
        name
      }
      time
    }
  }
`