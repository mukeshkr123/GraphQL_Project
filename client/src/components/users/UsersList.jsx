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
