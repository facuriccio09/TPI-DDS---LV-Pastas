import { createContext, useState, useEffect, useContext } from 'react';
import Keycloak from 'keycloak-js';

export const AuthContext = createContext();

// Configuración de Keycloak
const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'lv-pastas',
  clientId: 'lv-pastas-frontend'
};

// Instancia única de Keycloak (fuera del componente para evitar re-creaciones)
let keycloakInstance = null;
let isInitialized = false;

const getKeycloakInstance = () => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak(keycloakConfig);
  }
  return keycloakInstance;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevenir múltiples inicializaciones
    if (isInitialized) {
      console.log('⚠️ Keycloak ya está inicializado, saltando...');
      return;
    }

    console.log('🔐 Inicializando Keycloak...');
    const keycloak = getKeycloakInstance();
    isInitialized = true;
    
    // Inicializar Keycloak con check-sso (no fuerza login)
    keycloak.init({ 
      onLoad: 'check-sso',
      checkLoginIframe: false,
      pkceMethod: 'S256'
    })
    .then(authenticated => {
      console.log('✅ Keycloak inicializado. Autenticado:', authenticated);
      
      if (authenticated) {
        console.log('👤 Token presente, cargando información del usuario...');
        console.log('🔑 Token:', keycloak.token?.substring(0, 50) + '...');
        
        // Cargar info del usuario
        return keycloak.loadUserInfo().then(userInfo => {
          console.log('📋 UserInfo recibido:', userInfo);
          console.log('🔑 Realm Access:', keycloak.realmAccess);
          
          const roles = keycloak.realmAccess?.roles || [];
          const userData = {
            id: userInfo.sub,
            nombre: userInfo.name || userInfo.preferred_username,
            email: userInfo.email,
            rol: roles.includes('admin') ? 'admin' : 'usuario'
          };
          
          console.log('✅ Usuario configurado:', userData);
          setUser(userData);
          localStorage.setItem('token', keycloak.token);
        });
      } else {
        console.log('ℹ️ No autenticado (OK para rutas públicas)');
      }
    })
    .catch(error => {
      console.error('❌ Error al inicializar Keycloak:', error);
      isInitialized = false; // Permitir reintentos si falla
    })
    .finally(() => {
      console.log('✅ Inicialización completa. Loading = false');
      setLoading(false);
    });

    // Refrescar token automáticamente
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).then(refreshed => {
        if (refreshed) {
          localStorage.setItem('token', keycloak.token);
        }
      }).catch(() => {
        console.error('Error al refrescar el token');
        logout();
      });
    };
  }, []);

  const login = () => {
    const keycloak = getKeycloakInstance();
    keycloak.login({
      redirectUri: window.location.origin + '/'
    });
  };

  const register = () => {
    const keycloak = getKeycloakInstance();
    keycloak.register({
      redirectUri: window.location.origin + '/'
    });
  };

  const logout = () => {
    const keycloak = getKeycloakInstance();
    localStorage.removeItem('token');
    setUser(null);
    keycloak.logout({
      redirectUri: window.location.origin
    });
  };

  const isAdmin = () => {
    return user?.rol === 'admin';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
      logout, 
      isAdmin, 
      loading,
      keycloak: getKeycloakInstance()
    }}>
      {children}
    </AuthContext.Provider>
  );
};
