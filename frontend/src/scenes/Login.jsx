// export default function LoginPage() {
//   return (
//     <>
//     <p>login</p>
//     </>
//   )
// }


import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <p
      onClick={() => navigate("/home")}
      style={{ cursor: "pointer", color: "blue" }} // optional styling
    >
      login
    </p>
  );
}
