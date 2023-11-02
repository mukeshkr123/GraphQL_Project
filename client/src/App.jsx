import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import UsersList from "./components/users/UsersList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviesList from "./components/movies/MoviesList";
import Navbar from "./components/navbar/NavBar";

const App = () => {
  // Create an Apollo Client instance for making GraphQL queries.
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql", // Replace with your GraphQL server's URL.
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {/* Render the UsersList component within the ApolloProvider. */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/movies" element={<MoviesList />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
