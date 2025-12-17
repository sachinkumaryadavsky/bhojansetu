import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState<string>("");
  interface JwtPayload {
  id: number;
  role: "restaurant" | "ngo";
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      //  store token
    localStorage.setItem("token", res.data.token);
    setMessage(res.data.message);
    console.log(res.data.message);
    const decoded = jwtDecode<JwtPayload>(res.data.token);
    const role = decoded.role;
      //  redirect after login
     setTimeout(() => {
     // role-based redirect
    if (role === "restaurant") {
      navigate("/restaurant");
    } else {
      navigate("/ngo");
    }

    }, 1000);

    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
