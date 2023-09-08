import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  const addUser = () => {
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <h5>add user to the list</h5>
      <form onSubmit={addUser} className="mx-auto">
        <div className="my-2">
          <input
            type="text"
            placeholder="first name"
            className="mx-2 w-25"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-25"
            placeholder="last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            className="mx-2 w-25"
            placeholder="e-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-25"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-success btn-sm m-2">Create User</button>
      </form>
    </div>
  );
}

export default Form;
