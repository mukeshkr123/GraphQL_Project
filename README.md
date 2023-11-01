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

So, when you execute this query, you'll get a response containing the requested information about the United States or any other country with the code "US." This is a simplified example of how GraphQL queries work, allowing you to precisely specify the data you need and avoid over-fetching or under-fetching data from your API.

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
