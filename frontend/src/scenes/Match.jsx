// src/App.js
import React, { useState, useEffect } from "react";

// Dummy backend data
const dummyProfiles = [
  {
    username: "Alice",
    skills: ["JavaScript", "React"],
    preferences: ["Teamwork", "Remote"],
    interests: ["Gaming", "Robotics"],
    skill: "Frontend",
    major: "Computer Science",
  },
  {
    username: "Bob",
    skills: ["Python", "Machine Learning"],
    preferences: ["Research", "Collaboration"],
    interests: ["AI", "Hiking"],
    skill: "Backend",
    major: "Electrical Engineering",
  },
  // Add more profiles here
];

function App() {
  const [profiles, setProfiles] = useState(dummyProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle Accept/Reject
  const handleDecision = (accepted) => {
    console.log(
      accepted
        ? `Accepted ${profiles[currentIndex].username}`
        : `Rejected ${profiles[currentIndex].username}`
    );
    setCurrentIndex((prev) => (prev + 1) % profiles.length); // Loop through profiles
  };

  if (!profiles[currentIndex]) return <p>No more profiles!</p>;

  const currentProfile = profiles[currentIndex];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{currentProfile.username}</h2>
        <p><strong>Skills:</strong> {currentProfile.skills.join(", ")}</p>
        <p><strong>Preferences:</strong> {currentProfile.preferences.join(", ")}</p>
        <p><strong>Interests:</strong> {currentProfile.interests.join(", ")}</p>
        <p><strong>Skill:</strong> {currentProfile.skill}</p>
        <p><strong>Major:</strong> {currentProfile.major}</p>

        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, backgroundColor: "#f44336" }}
            onClick={() => handleDecision(false)}
          >
            Reject
          </button>
          <button
            style={{ ...styles.button, backgroundColor: "#4CAF50" }}
            onClick={() => handleDecision(true)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ececec",
  },
  card: {
    width: "360px", // Mobile-like width
    height: "640px", // Mobile-like height
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;
