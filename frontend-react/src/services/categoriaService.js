import api from './api';

/**
 * Obtener todas las categorías
 * @param {Object} params - Parámetros de consulta (activo)
 * @returns {Promise<Array>} Lista de categorías
 */
export const getCategorias = async (params = {}) => {
  try {
    const response = await api.get('/categorias', { params });
    return response.data.categorias || [];
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

/**
 * Obtener una categoría por ID
 * @param {number} id - ID de la categoría
 * @returns {Promise<Object>} Datos de la categoría
 */
export const getCategoriaById = async (id) => {
  try {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    throw error;
  }
};

// Crear una categoría (admin)
export const createCategoria = async (data) => {
  try {
    const response = await api.post('/categorias', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al crear la categoría';
  }
};

// Actualizar una categoría (admin)
export const updateCategoria = async (id, data) => {
  try {
    const response = await api.put(`/categorias/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al actualizar la categoría';
  }
};

// Eliminar una categoría (admin)
export const deleteCategoria = async (id) => {
  try {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al eliminar la categoría';
  }
};

// Activar/Desactivar categoría (admin)
export const toggleCategoria = async (id) => {
  try {
    const response = await api.patch(`/categorias/${id}/toggle`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al cambiar el estado de la categoría';
  }
};
