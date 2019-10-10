import React from "react";
import Navbar from "../Navbar/Navbar";
import firebase from "../../firebase";

export default function Dashboard(props) {

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please login first");
    props.history.replace("/login");
    return null;
  }

  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Hello {firebase.getCurrentUsername()}</h2>
        <h4>Welcome to your dashboard</h4>
      </div>
    </main>
  );
}
