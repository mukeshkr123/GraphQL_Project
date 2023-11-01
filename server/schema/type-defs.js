const { gql } = require("apollo-server");

const typeDefs = gql`
  # User type represents information about a user.

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
  }

  # Query type defines the available queries for the API.

  type Query {
    # users query returns a list of users.
    users: [User!]!
  }
`;

module.exports = typeDefs;
