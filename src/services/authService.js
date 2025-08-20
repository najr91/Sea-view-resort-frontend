const API = "/api/v1";
const getToken = () => localStorage.getItem("token");
import axios from "axios";

export const register = async (userData) => {
  const res = await axios.post(`${API}/register`, userData);
  return res.data;
};

export const login = async (data) => {
  try {
    const res = await axios.post(`${API}/login`, data);

    return {
      token: res.data.token,
      user: {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        profileImage: res.data.profileImage,
      },
    };
  } catch (error) {
    throw new Error("Error al intentar iniciar sesion");
  }
};

export const verifyToken = async () => {
  const res = await fetch(`${API}/verify-token`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.ok;
};

export const profile = async () => {
  const res = await fetch(`${API}/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Token invalido");
  return await res.json();
};
