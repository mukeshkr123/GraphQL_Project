const { UserList, Movies } = require("../Data");
const _ = require("lodash");

const resolvers = {
  Query: {
    // User Resolvers
    users: () => UserList,

    user: (parent, args) => {
      const id = args.id;
      // Find the user by ID and ensure it's a valid number.
      const user = _.find(UserList, { id: Number(id) });
      return user || null; // Handle the case where the user is not found.
    },

    // Movie Resolver
    movies: () => Movies,

    movie: (parent, args) => {
      const name = args.name;
      // Find the movie by name.
      const movie = _.find(Movies, (movie) => movie.name === name);
      return movie || null; // Handle the case where the movie is not found.
    },
  },

  User: {
    favouriteMovies: () => {
      // Filter and return movies published between 2000 and 2010.
      return _.filter(Movies, (movie) => {
        return (
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
        );
      });
    },
  },

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
