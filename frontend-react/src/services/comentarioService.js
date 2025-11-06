import api from './api';

// Obtener comentarios de una publicación
export const getComentariosByPublicacion = async (publicacionId) => {
  try {
    const response = await api.get(`/comentarios/publicacion/${publicacionId}`);
    return response.data.comentarios || [];
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    return [];
  }
};

// Crear un comentario
export const createComentario = async (data) => {
  try {
    const response = await api.post('/comentarios', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Actualizar un comentario
export const updateComentario = async (id, data) => {
  try {
    const response = await api.put(`/comentarios/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Eliminar un comentario
export const deleteComentario = async (id) => {
  try {
    const response = await api.delete(`/comentarios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener comentarios de un usuario
export const getComentariosByUsuario = async (usuarioId) => {
  try {
    const response = await api.get(`/comentarios/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
