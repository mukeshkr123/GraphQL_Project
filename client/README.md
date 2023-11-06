Certainly! Here's the documentation for using GraphQL in your React application with the `useQuery` and `useLazyQuery` hooks. You can add this to your project's README.

---

# GraphQL Integration in React

This guide explains how to integrate GraphQL into your React application using the Apollo Client library. We'll cover how to set up Apollo Client and use the `useQuery` and `useLazyQuery` hooks to fetch and display data from a GraphQL server.

## Installation

Before you begin, make sure you have the Apollo Client library and GraphQL installed in your project:

```bash
npm install @apollo/client graphql
```

## Setting up Apollo Client

To use GraphQL in your React application, you'll need to set up Apollo Client. Add the following code to your main `index.js` or `main.js` file:

```jsx
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql", // Replace with your GraphQL server's URL
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default App;
```

This code creates an Apollo Client instance and provides it to your application using the `ApolloProvider` component. Make sure to replace the `uri` with the URL of your GraphQL server.

## Using the `useQuery` Hook

The `useQuery` hook allows you to fetch data from your GraphQL server easily. Here's an example component that fetches a list of users:

```jsx
import { useQuery, gql } from "@apollo/client";
import "./UserLists.css"; // Import your CSS for styling.

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

const UsersList = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching users:", error.message);
    return <p>Error loading users.</p>;
  }

  return (
    <div className="user-list">
      {data.users.map((user) => (
        <div key={user.id} className="user-card">
          <h1 className="user-name">Name: {user.name}</h1>
          <p className "user-age">Age: {user.age}</p>
          <p className="user-username">Username: {user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
```

This component fetches user data from your GraphQL server, displays a loading message while data is loading, and handles errors if they occur.

## Using the `useLazyQuery` Hook

The `useLazyQuery` hook is suitable for situations where you want to fetch data on demand, such as searching for a specific movie. Here's an example of a component that allows you to search for movies:

```jsx
import { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import "./MoviesList.css"; // Import your CSS for styling.

const GET_ALL_MOVIES = gql`
  query Movies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const MoviesList = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const [showMovie, setShowMovie] = useState(false);

  const { data: moviesData } = useQuery(GET_ALL_MOVIES);
  const [fetchMovie, { data, error }] = useLazyQuery(GET_MOVIE_BY_NAME);

  const handleSearch = () => {
    if (movieSearched) {
      fetchMovie({
        variables: {
          name: movieSearched,
        },
      });
      setShowMovie(true);
    }
  };

  return (
    <>
      {moviesData && <h1>Total Movies: {moviesData.movies.length}</h1>}
      <div>
        <input
          type="text"
          placeholder="Search Movies...."
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button onClick={handleSearch}>Fetch Movies</button>
      </div>
      {showMovie && (
        <div className="movies-list">
          {data && data.movie ? (
            <div>
              <h1 className="movie-name">Name: {data.movie.name}</h1>
              <p className="movie-year">
                Year of Publication: {data.movie.yearOfPublication}
              </p>
            </div>
          ) : error ? (
            <p>There was an error in fetching data</p>
          ) : (
            <p>No movie found with the provided name</p>
          )}
        </div>
      )}
    </>
  );
};

export default MoviesList;
```

This component demonstrates how to use the `useLazyQuery` hook to search for movies and display the results, handling errors and missing data gracefully.

That's it! You've successfully integrated GraphQL into your React application using Apollo Client.

### create Mutation using `useMutation` hook

- Create a user

```jsx
import { useQuery, gql, useMutation } from "@apollo/client";
import "./UserLists.css"; // Import your CSS for styling.
import { useState } from "react";

// Define the GraphQL query to fetch all users.
const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

// create user mutation
const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const UsersList = () => {
  // Execute the query using useQuery from Apollo Client.
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);

  //create user mutation
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  //create user state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching users:", error.message);
    return <p>Error loading users.</p>;
  }

  return (
    <>
      <div>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name..."
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username..."
        />
        <input
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Age..."
        />
        <input
          onChange={(e) => setNationality(e.target.value.toLocaleUpperCase())}
          type="text"
          placeholder="Nationality...."
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  username,
                  age: Number(age),
                  nationality,
                },
              },
            });
            refetch();
          }}
        >
          Create User
        </button>
      </div>

      <div className="user-list">
        {data.users.map((user) => (
          <div key={user.id} className="user-card">
            <h1 className="user-name">Name: {user.name}</h1>
            <p className="user-age">Age: {user.age}</p>
            <p className="user-username">Username: {user.username}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersList;
```
