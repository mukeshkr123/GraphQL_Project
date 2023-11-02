const { UserList, Movies } = require("../Data");
const _ = require("lodash");

const resolvers = {
  Query: {
    //USER RESOLVERS
    users: () => {
      return UserList;
    },

    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    //MOVIE RESOLVER
    movies: () => {
      return Movies;
    },

    movie: (parents, args) => {
      const name = args.name;
      const movie = _.find(Movies, { name });
      return movie;
    },
  },

  User: {
    favouriteMovies: () => {
      return _.filter(Movies, (movie) => {
        return (
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
        );
      });
    },
  },
};

module.exports = { resolvers };
