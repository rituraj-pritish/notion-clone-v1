import { gql } from 'graphql-request';

export const SIGN_IN = gql`
  query Query($password: String!, $email: String!) {
    signin(password: $password, email: $email) {
      name
      id
      email
    }
  }
`;