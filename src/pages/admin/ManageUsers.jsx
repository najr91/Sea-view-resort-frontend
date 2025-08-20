import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user",
  });

  const getToken = () => localStorage.getItem("token");

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUsers(users.filter((e) => e._id !== id));
    } catch (err) {
      console.log(error);
      toast.error("Error al eliminar el usuario");
    }
  };

  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2 p-2">
          <span>¿Estás seguro que quieres eliminar este usuario?</span>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                await deleteUser(id);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/v1/users/${editingUser._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      setUsers(
        users.map((e) => (e._id === editingUser._id ? res.data.user : e))
      );
      setEditingUser(null);
      toast.success("Usuario actualizado correctamente");
    } catch (err) {
      console.log(err);
      toast.error("Error al actualizar usuario");
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Lista de usuarios</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Usuario</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border flex justify-center gap-2">
                {user.role !== "admin" && (
                  <>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white px-2 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => confirmDelete(user._id)}
                      style={{ backgroundColor: "#ceb996" }}
                      className=" text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Usuario</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[rgb(150,130,96)] hover:bg-[rgb(150,130,96)/0.9] text-white rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
