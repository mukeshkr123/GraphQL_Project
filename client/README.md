# GraphQL

## Installation

To get started with this GraphQL Users List example, you'll need to install the Apollo Client. Run the following command:

```shell
npm install @apollo/client graphql
```

## Setting up GraphQL

To set up GraphQL in your project, add the following code to your main `index.js` or `main.js` file:

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

## Using the `useQuery` Hook

In your application, you can use the `useQuery` hook to fetch data from your GraphQL server. Here's an example component:

```jsx
import { useQuery, gql } from "@apollo/client";
import "./UserLists.css"; // Import your CSS for styling.

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

const UsersList = () => {
  // Execute the query using useQuery from Apollo Client.
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
          <p className="user-age">Age: {user.age}</p>
          <p className="user-username">Username: {user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
```

This example demonstrates how to set up Apollo Client, define a GraphQL query, and use the `useQuery` hook to fetch user data from your GraphQL server.
