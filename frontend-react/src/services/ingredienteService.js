import api from './api';

// Obtener todos los ingredientes
export const getIngredientes = async (params = {}) => {
  try {
    const response = await api.get('/ingredientes', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener ingredientes';
  }
};

// Obtener solo alérgenos
export const getAlergenos = async () => {
  try {
    const response = await api.get('/ingredientes/alergenos/lista');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener alérgenos';
  }
};

// Obtener un ingrediente por ID
export const getIngredienteById = async (id) => {
  try {
    const response = await api.get(`/ingredientes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener el ingrediente';
  }
};

// Crear un ingrediente (admin)
export const createIngrediente = async (data) => {
  try {
    const response = await api.post('/ingredientes', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al crear el ingrediente';
  }
};

// Actualizar un ingrediente (admin)
export const updateIngrediente = async (id, data) => {
  try {
    const response = await api.put(`/ingredientes/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al actualizar el ingrediente';
  }
};

// Eliminar un ingrediente (admin)
export const deleteIngrediente = async (id) => {
  try {
    const response = await api.delete(`/ingredientes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al eliminar el ingrediente';
  }
};

// Asociar ingrediente a una publicación (admin)
export const asociarIngredienteAPublicacion = async (ingredienteId, data) => {
  try {
    const response = await api.post(`/ingredientes/${ingredienteId}/publicaciones`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al asociar ingrediente';
  }
};
