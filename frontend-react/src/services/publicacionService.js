import api from './api';

// Obtener todas las publicaciones
export const getPublicaciones = async (params = {}) => {
  try {
    const response = await api.get('/publicaciones', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener una publicación por ID con comentarios
export const getPublicacionById = async (id) => { 
  try {
    const response = await api.get(`/publicaciones/${id}`); //GET /api/publicaciones/:id
    // El backend devuelve { publicacion: {...} }
    return response.data.publicacion || response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Crear una publicación (admin)
export const createPublicacion = async (data) => {
  try {
    const response = await api.post('/publicaciones', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Actualizar una publicación (admin)
export const updatePublicacion = async (id, data) => {
  try {
    const response = await api.put(`/publicaciones/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Eliminar una publicación (admin)
export const deletePublicacion = async (id) => {
  try {
    const response = await api.delete(`/publicaciones/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Cambiar disponibilidad (admin)
export const toggleDisponibilidad = async (id) => {
  try {
    const response = await api.patch(`/publicaciones/${id}/disponibilidad`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
