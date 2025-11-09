// frontend/src/scenes/Register.jsx
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";

// Defined here for clarity
const MAX_PASSWORD_BYTES = 72; 

const handleSubmit = async (data, navigate) => {
  let password = data.password.trim();
  
  // --- START: CORRECTED TRUNCATION LOGIC ---
  const encoder = new TextEncoder();
  let passwordBytes = encoder.encode(password);

  // Check if truncation is needed
  if (passwordBytes.length > MAX_PASSWORD_BYTES) {
    passwordBytes = passwordBytes.slice(0, MAX_PASSWORD_BYTES);
    
    // Decode the truncated bytes back into a string and assign it back to 'password'
    password = new TextDecoder().decode(passwordBytes, { fatal: false });
    
    alert("Password was too long, automatically truncated to 72 bytes for security.");
  }
  // --- END: CORRECTED TRUNCATION LOGIC ---
  
  const payload = {
    social: data.linkedinLink || "",
    username: data.username.trim(),
    password, // <--- Now this is guaranteed to be <= 72 bytes
    skills: data.skills.split(",").map(s => s.trim()).filter(Boolean),
    preferences: data.preferences.split(",").map(s => s.trim()).filter(Boolean),
    interests: data.interests.split(",").map(s => s.trim()).filter(Boolean),
    skill: data.skill?.trim() || "",
    major: data.major?.trim() || ""
  };

  try {
<<<<<<< HEAD
    const res = await axios.post("http://localhost:8000/users/", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    if (res.status === 201) {
      navigate("/home")
=======
    const res = await axios.post("http://localhost:8000/users/", payload);

    if (res.status === 200 || res.status === 201) {
      navigate("/home");
    } else {
      console.error("Unexpected response:", res);
      alert("Unexpected server response.");
>>>>>>> 301fc0c999bd6e6bf62251ee41ff05e5602c98d1
    }
  } catch (e) {
    // This will now catch the specific "Username already registered" error from main.py
    console.error("Error registering user:", e.response?.data || e.message);
    alert(e.response?.data?.detail || e.message);
  }
};

export default function Register() {
  const navigate = useNavigate();

  return (
    <Form
      type="register"
      submit={(data) => handleSubmit(data, navigate)}
    />
  );
}