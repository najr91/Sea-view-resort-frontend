const urlRooms =
  import.meta.env.VITE_APP_ROOMS || "http://localhost:4002/api/rooms";

/**
 * Helper para parsear respuesta fetch y devolver un objeto consistente
 */
async function parseResponse(res) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    data = text;
  }
  return { ok: res.ok, status: res.status, data };
}

/* -------------------------
   READ - obtener todas las habitaciones
   GET /api/rooms
--------------------------*/
export const getRooms = async () => {
  try {
    const respuesta = await fetch(`${urlRooms}`);
    return await parseResponse(respuesta);
  } catch (error) {
    console.error("getRooms error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};

/* -------------------------
   CREATE - crear habitación
   POST /api/rooms  (body JSON)
--------------------------*/
export const crearRoom = async (dato) => {
  try {
    const respuesta = await fetch(`${urlRooms}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dato),
    });
    return await parseResponse(respuesta);
  } catch (error) {
    console.error("crearRoom error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};

/* -------------------------
   READ single - obtener habitación por id
   GET /api/rooms/:id
--------------------------*/
export const getRoomByID = async (id) => {
  try {
    const respuesta = await fetch(`${urlRooms}/${id}`);
    return await parseResponse(respuesta);
  } catch (error) {
    console.error("getRoomByID error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};

/* -------------------------
   UPDATE - actualizar habitación
   PUT /api/rooms/:id
--------------------------*/
export const updateRoom = async (id, producto) => {
  try {
    const respuesta = await fetch(`${urlRooms}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    return await parseResponse(respuesta);
  } catch (error) {
    console.error("updateRoom error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};

/* -------------------------
   DELETE - eliminar habitación
   DELETE /api/rooms/:id
--------------------------*/
export const deleteRoom = async (id) => {
  try {
    const respuesta = await fetch(`${urlRooms}/${id}`, {
      method: "DELETE",
    });
    return await parseResponse(respuesta);
  } catch (error) {
    console.error("deleteRoom error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};

/* -------------------------
   Añadir imágenes por nombre (solo nombres de files que ya existen en servidor)
   POST /api/rooms/:id/images  body: { imageNames: [ "file1.jpg", ... ] }
--------------------------*/
export const addImagesByNames = async (id, imageNames = []) => {
  try {
    const respuesta = await fetch(`${urlRooms}/${id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageNames }),
    });
    return await parseResponse(respuesta);
  } catch (error) {
    console.error("addImagesByNames error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};

/* -------------------------
   Listar imágenes disponibles en src/uploads/rooms
   GET /api/rooms/available-images
--------------------------*/
export const listAvailableImages = async () => {
  try {
    const respuesta = await fetch(`${urlRooms}/available-images`);
    return await parseResponse(respuesta);
  } catch (error) {
    console.error("listAvailableImages error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};

/* -------------------------
   Eliminar imagen de una habitación
   DELETE /api/rooms/:id/images  body: { imageUrl: "..." }
--------------------------*/
export const deleteImage = async (id, imageUrl) => {
  try {
    const respuesta = await fetch(`${urlRooms}/${id}/images`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
    return await parseResponse(respuesta);
  } catch (error) {
    console.error("deleteImage error:", error);
    return { ok: false, status: 0, data: null, error };
  }
};
