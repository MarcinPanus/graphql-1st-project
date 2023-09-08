import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  return (
    <table className="table table-striped border my-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">first name</th>
          <th scope="col">last name</th>
          <th scope="col">e-mail</th>
          <th scope="col">password</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button type="button" className="btn btn-danger btn-sm">
                  delete user
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default GetUsers;
