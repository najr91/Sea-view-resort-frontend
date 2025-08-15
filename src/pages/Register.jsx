import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(data);
      toast.success("Gracias por registrarte. Revisa tu email.");
      navigate("/login");
    } catch (err) {
      const messages = err.response?.data?.error;
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
        toast.error(messages || "Error al registrarse", {
          iconTheme: {
            primary: "#968260",
            secondary: "#fff",
          },
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Registro</h2>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          className="w-full mb-2 p-2 border"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border"
          onChange={handleChange}
        />
        <button className="w-full bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white p-2 rounded mb-4">
          Registrarse
        </button>
        <p className="text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[rgb(150,130,96)] hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
