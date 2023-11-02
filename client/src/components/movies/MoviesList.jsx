import { useQuery, gql } from "@apollo/client";

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

const MoviesList = () => {
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

export default MoviesList;
