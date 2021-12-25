import { gql } from 'graphql-request';

export const SIGN_IN = gql`
  query Signin($password: String!, $email: String!) {
    signin(password: $password, email: $email) {
      name
      id
      email
    }
  }
`;

export const LOGOUT = gql`
  query Logout {
    logout
  }
`;