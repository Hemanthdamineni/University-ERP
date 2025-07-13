import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { ViewMode } from '../types';

interface ViewModeContextType {
  viewMode: ViewMode['mode'];
  toggleViewMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};

export const ViewModeProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode['mode']>('basic');

  useEffect(() => {
    const storedMode = localStorage.getItem('view_mode') as ViewMode['mode'];
    if (storedMode) {
      setViewMode(storedMode);
    }
  }, []);

  const toggleViewMode = () => {
    const newMode = viewMode === 'basic' ? 'advanced' : 'basic';
    setViewMode(newMode);
    localStorage.setItem('view_mode', newMode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};