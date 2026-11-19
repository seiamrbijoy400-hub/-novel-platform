import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReadingSettings } from '../types/user';

interface ReaderContextType {
  settings: ReadingSettings;
  updateSettings: (newSettings: Partial<ReadingSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 18,
  fontFamily: 'serif',
  theme: 'paper',
  lineHeight: 1.8,
  marginHorizontal: 24,
  readingMode: 'scroll',
  distractionFree: false,
};

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export const ReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ReadingSettings>(() => {
    const saved = localStorage.getItem('novela_reader_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('novela_reader_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<ReadingSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <ReaderContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </ReaderContext.Provider>
  );
};

export const useReader = () => {
  const context = useContext(ReaderContext);
  if (!context) throw new Error('useReader must be used within a ReaderProvider');
  return context;
};
