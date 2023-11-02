# Beginner's Guide to GraphQL

GraphQL is a powerful query language for your API, allowing you to request exactly the data you need, and nothing more. In this beginner's guide, we'll introduce you to the basic concepts of GraphQL, including types and how to define them. We'll use a simple example to illustrate these concepts.

## Types in GraphQL

Types in GraphQL define the structure of your data. They are the building blocks for your API, describing what kind of data you can request and return. Let's take a look at an example with two types: `User` and `Video`.

### User Type

```graphql
type User {
  id: ID!
  name: String!
  age: Int
  height: Float!
  isMarried: Boolean
  friends: [User!]
  videosPosted: [Video!]
}
```

In the `User` type definition:

- `id: ID!`: This field represents a unique identifier (ID) for the user, and the exclamation mark (!) indicates that it's a required field. Every user must have an ID.

- `name: String!`: This field represents the user's name, which is a required string. Every user must have a name.

- `age: Int`: The age field is an optional integer. Not all users need to have an age specified.

- `height: Float!`: Height is a required floating-point number.

- `isMarried: Boolean`: The marital status is an optional boolean, which means a user can have a marital status or not.

- `friends: [User]`: The `friends` field is a list of `User` types. It represents a user's friends, allowing for a one-to-many relationship between users.

- `videosPosted: [Video]`: Similarly, `videosPosted` is a list of `Video` types, indicating that a user can post multiple videos.

### Video Type

```graphql
type Video {
  id: ID!
  title: String!
  description: String!
}
```

In the `Video` type definition:

- `id: ID!`: Like the `User` type, a video also has a unique identifier, and it is required.

- `title: String!`: The video title is a required string.

- `description: String!`: The video description is also a required string.

### Explanation

- GraphQL types are defined using the `type` keyword, followed by the type name (e.g., `User` or `Video`).

- Fields within a type are defined with their name and type (e.g., `id: ID!`). The exclamation mark (!) indicates a required field.

- GraphQL supports various scalar types, including `ID`, `String`, `Int`, `Float`, and `Boolean`. You can also create custom types for more complex data structures.

- Fields can have null or non-null values. Non-null fields are marked with an exclamation mark (!).

- Lists of types can be represented using square brackets (e.g., `[User]` and `[Video]`), indicating a one-to-many relationship.

- Types can have relationships with other types, as shown by the `friends` and `videosPosted` fields in the `User` type.

## Basic GraphQL Query

In GraphQL, queries are used to request specific data from your API. Here's a basic GraphQL query that fetches information about a country with the code "US."

```graphql
query GetCountry {
  country(code: "US") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}
```

Let's break down this query and explain each part:

- `query GetCountry`: This line declares a GraphQL query named "GetCountry." Queries are named for identification and documentation purposes.

- `country(code: "US")`: This line specifies that we want to fetch information about a country with the code "US." It's like calling a function with arguments in GraphQL. "country" is a field, and we're passing an argument, "code," with the value "US" to it.

- The following lines within the `country` block specify the fields we want to retrieve about the country:

  - `name`: Request the name of the country.

  - `native`: Request the native name of the country.

  - `capital`: Request the capital city of the country.

  - `emoji`: Request the country's emoji flag.

  - `currency`: Request the currency used in the country.

  - `languages`: Request information about the languages spoken in the country. It's a list of objects with fields `code` and `name` for each language.

**Install Apollo** - `npm install apollo-server graphql`

## Basic Apollo Server Setup

Here's the code for creating a basic Apollo Server:

```javascript
const { ApolloServer, gql } = require("apollo-server");

// Define your schema using the gql template literal
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolver functions
const resolvers = {
  Query: {
    hello: () => "Hello, World!",
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

In this code, we:

1. Import the necessary modules, including `ApolloServer` and `gql` from "apollo-server."

2. Define a simple GraphQL schema using the `gql` template literal. In this case, we define a single "Query" type with a "hello" field that returns a string.

3. Create resolver functions for the "Query" type to handle the request for the "hello" field.

4. Initialize an Apollo Server with the defined schema and resolvers.

5. Start the server, which will be available at the specified URL.

### Adding More Complex Schema Definitions

To create a more sophisticated GraphQL schema, you can define custom types and queries. Here's an example:

**Create `typeDefs.js` for More Complex Schema:**

```javascript
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
```

**Create `resolvers.js` for More Complex Schema:**

```javascript
const { UserList } = require("../Data");

const resolvers = {
  Query: {
    users() {
      return UserList;
    },
  },
};

module.exports = { resolvers };
```

### Creating Mutations

**Create `typeDefs.js` for More Complex Schema:**

```javascript
const { gql } = require("apollo-server");

const typeDefs = gql`
  # Mutations
  input CreateUserInput {
    name: String! # User's name.
    username: String! # User's username.
    age: Int! # User's age.
    nationality: Nationality = UK # User's nationality, defaults to UK.
  }

  type Mutation {
    # createUser mutation creates a new user with the provided input.
    createUser(input: CreateUserInput!): User
  }
`;

module.exports = typeDefs;
```

**Create `resolvers.js` for More Complex Schema:**

```javascript
const { UserList } = require("../Data");

const resolvers = {
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      // Generate a unique ID for the new user.
      const lastId = UserList.length > 0 ? UserList[UserList.length - 1].id : 0;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
  },
};

module.exports = { resolvers };
```
