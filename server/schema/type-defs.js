const { gql } = require("apollo-server");

const typeDefs = gql`
  # User type represents information about a user.
  type User {
    id: ID! # Unique identifier for the user.
    name: String! # User's name.
    username: String! # User's username.
    age: Int! # User's age.
    nationality: Nationality! # User's nationality from the defined enum.
    friends: [User] # List of user's friends, also of type User.
    favouriteMovies: [Movie] # List of user's favorite movies, of type Movie.
  }

  # Movie type represents information about a movie.
  type Movie {
    id: ID! # Unique identifier for the movie.
    name: String! # Movie's name.
    yearOfPublication: Int! # Year of movie's publication.
    isInTheaters: Boolean! # Whether the movie is currently in theaters.
  }

  # Query type defines the available queries for the API.
  type Query {
    # users query returns a list of users.
    users: [User!]!

    # user query returns a user by ID.
    user(id: ID!): User

    # movies query returns a list of movies.
    movies: [Movie!]!

    # movie query returns a movie by name.
    movie(name: String!): Movie
  }

  # Mutations
  input CreateUserInput {
    name: String! # User's name.
    username: String! # User's username.
    age: Int! # User's age.
    nationality: Nationality = UK # User's nationality, defaults to UK.
  }

  input UpdateUsernameInput {
    id: ID! # ID of the user to update.
    newUsername: String! # User's new username.
  }

  type Mutation {
    # createUser mutation creates a new user with the provided input.
    createUser(input: CreateUserInput!): User

    # updateUsername mutation updates a user's username.
    updateUsername(input: UpdateUsernameInput!): User

    # deleteUser mutation deletes a user by ID.
    deleteUser(id: ID!): User
  }

  # Enums
  enum Nationality {
    UK # United Kingdom
    US # United States
    CA # Canada
    AU # Australia
  }
`;

module.exports = { typeDefs };
