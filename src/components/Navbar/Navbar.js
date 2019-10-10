import React from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link className="brand-logo" to="/">
          Hooks
        </Link>

        {!firebase.getCurrentUsername() ? (
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
