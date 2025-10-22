import { useState, useCallback } from 'react';

export function useNavigation() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPopupOpen, setPopupOpen] = useState(false);

  const navigateToTab = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const openPopup = useCallback(() => {
    setPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const togglePopup = useCallback(() => {
    setPopupOpen(prev => !prev);
  }, []);

  const isTabActive = useCallback((tabName) => {
    return activeTab === tabName;
  }, [activeTab]);

  const getCurrentTab = useCallback(() => {
    return activeTab;
  }, [activeTab]);

  const navigateWithValidation = useCallback((tabName, validTabs = ['Overview', 'Contacts', 'Favorites']) => {
    if (validTabs.includes(tabName)) {
      setActiveTab(tabName);
      return true;
    }
    console.warn(`Tab "${tabName}" is not valid. Valid tabs:`, validTabs);
    return false;
  }, []);

  const resetNavigation = useCallback(() => {
    setActiveTab('Overview');
    setPopupOpen(false);
  }, []);

  return {
    activeTab,
    isPopupOpen,
    navigateToTab,
    openPopup,
    closePopup,
    togglePopup,
    isTabActive,
    getCurrentTab,
    navigateWithValidation,
    resetNavigation,
    setActiveTab,
    setPopupOpen
  };
}
