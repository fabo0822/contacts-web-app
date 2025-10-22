import { useState, useCallback } from 'react';

export function useNavigation() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Navegar a una pestaña específica
  const navigateToTab = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  // Abrir el popup
  const openPopup = useCallback(() => {
    setPopupOpen(true);
  }, []);

  // Cerrar el popup
  const closePopup = useCallback(() => {
    setPopupOpen(false);
  }, []);

  // Alternar estado del popup
  const togglePopup = useCallback(() => {
    setPopupOpen(prev => !prev);
  }, []);

  // Verificar si una pestaña está activa
  const isTabActive = useCallback((tabName) => {
    return activeTab === tabName;
  }, [activeTab]);

  // Obtener la pestaña activa actual
  const getCurrentTab = useCallback(() => {
    return activeTab;
  }, [activeTab]);

  // Navegación con validación
  const navigateWithValidation = useCallback((tabName, validTabs = ['Overview', 'Contacts', 'Favorites']) => {
    if (validTabs.includes(tabName)) {
      setActiveTab(tabName);
      return true;
    }
    console.warn(`Tab "${tabName}" no es válida. Tabs válidas:`, validTabs);
    return false;
  }, []);

  // Resetear navegación (útil para limpiar estado)
  const resetNavigation = useCallback(() => {
    setActiveTab('Overview');
    setPopupOpen(false);
  }, []);

  return {
    // Estado
    activeTab,
    isPopupOpen,
    
    // Acciones de navegación
    navigateToTab,
    openPopup,
    closePopup,
    togglePopup,
    
    // Utilidades
    isTabActive,
    getCurrentTab,
    navigateWithValidation,
    resetNavigation,
    
    // Setters directos (para compatibilidad)
    setActiveTab,
    setPopupOpen
  };
}
