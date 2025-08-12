const urlRooms = ""
export const getRooms = async () => {
    try {
        const respuesta = await fetch(urlRooms);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

export const crearProductoApi = async(dato)=>{
    try {
        const respuesta = await fetch(urlProductos,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dato)
        })
    
        const producto = {
            datos: await respuesta.json(),
            status: respuesta.status
        }
        return producto
    } catch (error) {
        console.log(error)
}    
}

export const getRoomsID = async(id) => {
    try {
        const respuesta = await fetch(`${urlRooms}/${id}`);
        const producto = {
            datos: await respuesta.json(),
            status: respuesta.status
        }
        return producto;
    } catch (error) {
        console.log(error);
    }   
}

export const upDateRooms = async(id,producto)=>{
    try {
        const respuesta = await fetch(`${urlRooms}/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        
        return respuesta

    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteRooms = async(id)=>{
    try {
        const respuesta = await fetch(`${urlRooms}/${id}`,{
            method: 'DELETE',
        })
        return respuesta
    } catch (error) {
        console.log(error)
    }
}
