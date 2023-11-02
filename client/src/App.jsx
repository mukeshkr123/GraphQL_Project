import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>App</ApolloProvider>;
};

export default App;
