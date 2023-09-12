import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER_MUTATION } from "../GraphQL/Mutations";

function ItemOfTheList({ user, setUsers }) {
  const [deleteUser, { error }] = useMutation(DELETE_USER_MUTATION);

  const removeUser = (clickedId) => {
    deleteUser({
      variables: {
        id: clickedId,
      },
    });
    if (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <th scope="row">{user.id}</th>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => removeUser(user.id)}
        >
          delete user
        </button>
      </td>
    </tr>
  );
}

export default ItemOfTheList;
