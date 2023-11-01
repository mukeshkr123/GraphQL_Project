const { gql } = require("apollo-server");

const typeDefs = gql`
  # User type represents information about a user.

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  # Query type defines the available queries for the API.

  type Query {
    # users query returns a list of users.
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  # crete enums
  enum Nationality {
    UK
    US
    CA
    AU
  }
`;

module.exports = { typeDefs };
