import { gql } from "@apollo/client";

export const DO_ANONYMOUS_SIGNUP = gql`
    mutation doAnonymousSignup($username: String!,$email: String!,$password: String!){
      register(input: { username: $username, email: $email, password: $password }) {
        jwt
        user {
          username
          email
        }
      }
    }
`
