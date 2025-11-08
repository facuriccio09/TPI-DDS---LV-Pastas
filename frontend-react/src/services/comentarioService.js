import api from './api';

export const getComentariosByPublicacion = async (publicacionId) => {
  try {
    const response = await api.get(`/comentarios/publicacion/${publicacionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener comentarios';
  }
};

export const createComentario = async (comentarioData) => {
  try {
    const response = await api.post('/comentarios', comentarioData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al crear comentario';
  }
};

export const updateComentario = async (id, comentarioData) => {
  try {
    const response = await api.put(`/comentarios/${id}`, comentarioData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al actualizar comentario';
  }
};

export const deleteComentario = async (id) => {
  try {
    const response = await api.delete(`/comentarios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al eliminar comentario';
  }
};

export const getComentariosByUsuario = async (usuarioId) => {
  try {
    const response = await api.get(`/comentarios/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener comentarios del usuario';
  }
};
