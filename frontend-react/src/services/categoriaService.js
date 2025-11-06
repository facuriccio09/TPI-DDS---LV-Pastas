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
