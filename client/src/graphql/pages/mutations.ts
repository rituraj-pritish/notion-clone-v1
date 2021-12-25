import { gql } from 'graphql-request';

export const CREATE_PAGE = gql`
  mutation createPage($name: String!) {
    signin(name: $name) {
      id
      name
    }
  }
`;