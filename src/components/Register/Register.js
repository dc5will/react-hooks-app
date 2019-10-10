import React, { useState } from "react";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    // fetch request here
    e.preventDefault();
    props.storeUser({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onchange={e => setUsername(e.target.value)}
        placeholder="enter username"
      />
      <input
        type="text"
        onchange={e => setPassword(e.target.value)}
        placeholder="enter password"
      />
      <input type="submit" />
    </form>
  );
}
