import React from 'react';
import { Link } from 'react-router';

const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.id}>
            <Link to={`user/${user.id}`}>{user.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
