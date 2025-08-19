import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      const messages = err.response?.data?.err;
      if (Array.isArray(messages)) {
        messages.forEach((msg) =>
          toast.error(msg, {
            iconTheme: {
              primary: "#968260",
              secondary: "#fff",
            },
          })
        );
      } else {
        toast.error(messages || "Error al iniciar sesion", {
          iconTheme: {
            primary: "#968260",
            secondary: "#fff",
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>

        {error && <div className="text-yellow-500 text-sm mb-2">{error}</div>}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded p-2 mb-3"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full border rounded p-2 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white rounded py-2 mb-4"
        >
          Entrar
        </button>

        <div className="text-center text-sm space-y-2">
          <p>
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-[rgb(150,130,96)] hover:underline"
            >
              Regístrate
            </Link>
          </p>
          <p>
            <Link
              to="/forgot-password"
              className="text-[rgb(150,130,96)] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
