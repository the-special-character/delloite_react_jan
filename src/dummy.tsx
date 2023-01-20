import React, { memo } from 'react';

type Props = {};

const Dummy = ({ user, submitData }: Props) => {
  console.log('Dummy render');

  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <button onClick={submitData}>Submit</button>
    </div>
  );
};

export default memo(Dummy);
