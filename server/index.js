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
