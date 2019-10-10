import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import firebase from "../../firebase";

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onRegister() {
    try {
      await firebase.register(name, email, password);
      props.history.replace("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={e => e.preventDefault() && false}>
          <div className="input-field">
            <input
              placeholder="username"
              type="text"
              value={name}
              className="validate"
              aria-label="username"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="email"
              type="text"
              value={email}
              className="validate"
              aria-label="email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              placeholder="password"
              type="password"
              value={password}
              className="validate"
              aria-label="password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-large" onClick={onRegister}>
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
