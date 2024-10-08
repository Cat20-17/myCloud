import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>USER PAGE</h1>
      <h1>Current User Id: { id }</h1>
    </div>
  );
};

export default UserPage;