// src/services/usuarioService.js
import api from './api';

/**
 * Obtiene la lista de todos los usuarios (solo admin)
 */
export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener usuarios';
  }
};

/**
 * Obtiene un usuario por ID (solo admin)
 */
export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener el usuario';
  }
};

/**
 * Actualiza un usuario (solo admin)
 */
export const updateUsuario = async (id, data) => {
  try {
    const response = await api.put(`/usuarios/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al actualizar el usuario';
  }
};

/**
 * Elimina (desactiva) un usuario (solo admin)
 */
export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al eliminar el usuario';
  }
};

/**
 * Activa un usuario (solo admin)
 */
export const activarUsuario = async (id) => {
  try {
    const response = await api.patch(`/usuarios/${id}/activar`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error al activar el usuario';
  }
};
