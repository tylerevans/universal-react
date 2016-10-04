import React, { PropTypes } from 'react';

const UserCard = ({ user }) => {
  return (
    <ul>
      <li>Name: {user.name}</li>
      <li>Username: {user.username}</li>
      <li>Email: {user.email}</li>
      <li>Phone: {user.phone}</li>
      <li>Website: {user.website}</li>
    </ul>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
