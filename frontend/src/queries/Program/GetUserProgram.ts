import { gql } from "@apollo/client";

export const GET_USER_PROGRAM = gql`
  query GetUserPrograms {
    getUserPrograms {
      id
      price
      commissionRate
      createdAt
      startDate
      paidAt
      status
      receip
      user {
        id
        email
        firstname
        lastname
        avatar
      }
      coach {
        id
        email
        firstname
        lastname
        avatar
      }
      program {
        id
        title
      }
    }
  }
`;
