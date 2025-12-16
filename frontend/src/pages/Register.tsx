import { useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {
  const [formData, setFormData] = useState<{
  name: string;
  email: string;
  password: string;
  role: "restaurant" | "ngo";
  address: string;
}>({
  name: "",
  email: "",
  password: "",
  role: "restaurant", // default value
  address: "",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);
      alert(res.data.message); // "Registered Successfully"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br />

        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />

        <select name="role" onChange={handleChange}>
          <option value="restaurant">Restaurant</option>
          <option value="ngo">NGO</option>
        </select>
        <br />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
