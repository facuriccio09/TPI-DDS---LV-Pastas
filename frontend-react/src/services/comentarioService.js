import api from './api';

const handleError = (error, defaultMessage) => {
  const errorData = error.response?.data;
  if (errorData?.details && Array.isArray(errorData.details)) {
    const detailsMsg = errorData.details
      .map(d => (typeof d === 'object' ? d.message : d))
      .join('. ');
    return `${errorData.error}: ${detailsMsg}`;
  }
  return errorData?.error || defaultMessage;
};

export const getComentariosByPublicacion = async (publicacionId) => {
  try {
    const response = await api.get(`/comentarios/publicacion/${publicacionId}`);
    return response.data;
  } catch (error) {
    throw handleError(error, 'Error al obtener comentarios');
  }
};

export const createComentario = async (comentarioData) => {
  try {
    const response = await api.post('/comentarios', comentarioData);
    return response.data;
  } catch (error) {
    throw handleError(error, 'Error al crear comentario');
  }
};

export const updateComentario = async (id, comentarioData) => {
  try {
    const response = await api.put(`/comentarios/${id}`, comentarioData);
    return response.data;
  } catch (error) {
    throw handleError(error, 'Error al actualizar comentario');
  }
};

export const deleteComentario = async (id) => {
  try {
    const response = await api.delete(`/comentarios/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error, 'Error al eliminar comentario');
  }
};

export const getComentariosByUsuario = async (usuarioId) => {
  try {
    const response = await api.get(`/comentarios/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    throw handleError(error, 'Error al obtener comentarios del usuario');
  }
};
