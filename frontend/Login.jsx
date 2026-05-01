import { useState } from "react";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div>
      <input placeholder="email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input placeholder="password" type="password" onChange={e => setForm({...form, password: e.target.value})}/>
      <button onClick={login}>Login</button>
    </div>
  );
}
