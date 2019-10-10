import React from "react";
import Navbar from '../Navbar/Navbar';

export default function HomePage(props) {
  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Welcome</h2>
        <p>Practicing with React Hooks</p>
      </div>
    </main>
  );
}
