// src/services/authService.js
import api from './api';

/**
 * Llama al endpoint de login del backend.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} { message, usuario, token }
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/usuarios/login', { email, password });
    // El backend devuelve { message, usuario, token }
    return response.data;
  } catch (error) {
    // El interceptor de api.js podría manejar el 401,
    // pero si hay otro error (ej. 400), lo relanzamos.
    throw error.response?.data?.error || 'Error en el servicio de login';
  }
};

/**
 * Llama al endpoint de registro del backend.
 * @param {string} nombre
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} { message, usuario, token }
 */
export const register = async (nombre, email, password) => {
  try {
    const response = await api.post('/usuarios/register', { nombre, email, password });
    // El backend devuelve { message, usuario, token }
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error en el servicio de registro';
  }
};

/**
 * Llama al endpoint de perfil del backend.
 * @returns {Promise<object>} { usuario }
 */
export const getPerfil = async () => {
  try {
    const response = await api.get('/usuarios/perfil');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener el perfil';
  }
};