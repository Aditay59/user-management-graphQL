const typeDefs = `#graphql
    type User {
        id: Int,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        createdAt: String
        password: String
        role: String
    }

    type Query {
        getAllUsers: [User!]!
    }

    input userInput {
        id: Int,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phone: String,
        role: String
    }

    type Mutation {
        getUserById(id: Int!): User!
        authenticateUser(email: String!, password: String!): User!
        createNewUser(user: userInput): String!
        updateUserDetails(id: Int!, user: userInput!): String!
        deleteUseById(id: Int!): String!
    }
`;

module.exports = typeDefs;