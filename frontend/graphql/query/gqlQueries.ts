import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query {
        getAllUsers{
            id
            firstName
            lastName
            email
            phone
            role
        }
    }
`;

export const CHECK_USER = gql`
    mutation($mail: String!, $pass: String!){
        authenticateUser(email: $mail, password: $pass) {
        email
    }
}
`;

export const ADD_USER = gql`
    mutation($user: userInput!) {
        createNewUser(user: $user)
    }
`;

export const DELETE_USER = gql`
    mutation($uid: Int!) {
        deleteUseById(id: $uid)
    }
`;

export const UPDATE_USER = gql`
    mutation($uid: Int!, $userUpdate: userInput!) {
        updateUserDetails(id: $uid, user: $userUpdate)
    }
`;