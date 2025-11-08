import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./scenes/Home"
import LoginPage from "./scenes/Login"
import RegisterPage from "./scenes/Register"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
