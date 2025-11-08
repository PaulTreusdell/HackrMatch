import Header from "../components/Layout"
import React from "react";
import "./MainPage.css"

export default function MainPage() {
  return (
    <div className = "main-container">

    <Header />
      

      <main className = "main-content">
                <h1>Welcome to HackrMatch!</h1>
        <p>
          HackrMatch helps developers and students find and join teams for hackathons and
          projects! Connect with like-minded individuals,
          collaborate, and build amazing things together!
        </p>
        <button className="cta-button" onClick={() => alert("Get Started!")}>
          Get Started
        </button>
      </main>

    <body className = "body-content">
        Using our proprietary algorithm.
    </body>

      <footer className="footer">
        <p>© 2025 HackrMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}


