import React from 'react';

// Types
type UserType = {
  user_name: string;
  user_email: string;
};
type UsersTableProps = {
  users: Array<UserType>;
};

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div>
      <h3 className="my-3">Users</h3>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index: number) => {
            const { user_name, user_email } = user;

            return (
              <li key={index}>
                {user_name}, {user_email}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No users in the DB</p>
      )}
    </div>
  );
};

export default UsersTable;
