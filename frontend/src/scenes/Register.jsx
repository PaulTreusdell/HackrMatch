import { useNavigate } from "react-router-dom"
import Form from "../components/Form" 
import axios from "axios"


const handleSubmit = async (data, navigate) => {
  try {
    const res = await axios.post("http://localhost:8000/users/", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    if (res.status === 201) {
      navigate("/home")
    }
  }
  catch(e) {
    console.error(`Error Logging in ${e}`)
  }
}

export default function Register() {
  const navigate = useNavigate()
  return (
    <Form type="register" submit={(data) => {
      handleSubmit(data, navigate)
    }}/>
  )
}