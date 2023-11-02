import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import UsersList from "./components/UsersList";

const App = () => {
  // Create an Apollo Client instance for making GraphQL queries.
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql", // Replace with your GraphQL server's URL.
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {/* Render the UsersList component within the ApolloProvider. */}
      <UsersList />
    </ApolloProvider>
  );
};

export default App;
