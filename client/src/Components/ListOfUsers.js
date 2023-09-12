import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import ItemOfTheList from "./ItemOfTheList";

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
          return <ItemOfTheList {...{ user, setUsers }} key={user.id} />;
        })}
      </tbody>
    </table>
  );
}

export default GetUsers;
