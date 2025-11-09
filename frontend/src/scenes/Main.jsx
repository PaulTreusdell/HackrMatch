import Header from "../components/Layout"
import React from "react";
import "./MainPage.css"
import teamWork from "../images/teamwork.png"

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

    <section className="body-section">
        <div className="text-content">
          <h2>Smart Team Matching</h2>
          <p>
            Using our proprietary algorithm, we provide dynamic recommendations
            for each individual based on their inputted profile. Whether you’re
            looking for a UI/UX engineer, data scientist, or backend developer,
            HackrMatch finds your perfect teammate!
          </p>
        </div>
        <div className="image-content">
          <img src={teamWork} alt="Teamwork" className="body-image" />

        </div>
      </section>

      <footer className="footer">
        <p>© 2025 HackrMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}


