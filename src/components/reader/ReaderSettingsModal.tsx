import React from 'react';
import { useReader } from '../../context/ReaderContext';
import { ReadingSettings } from '../../types/user';
import { X, Type } from 'lucide-react';

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, resetSettings } = useReader();

  if (!isOpen) return null;

  const themes: Array<{ id: ReadingSettings['theme']; label: string; bg: string; fg: string }> = [
    { id: 'light',   label: 'Light',  bg: '#FFFFFF', fg: '#111110' },
    { id: 'sepia',   label: 'Sepia',  bg: '#FFF8E7', fg: '#5C4A1E' },
    { id: 'dark',    label: 'Dark',   bg: '#1C1C1A', fg: '#E8E6E1' },
    { id: 'night',   label: 'Night',  bg: '#000000', fg: '#CCCCCC' },
  ];

  const fonts: Array<{ id: ReadingSettings['fontFamily']; label: string }> = [
    { id: 'literata',    label: 'Literata (Serif)' },
    { id: 'sans-serif',  label: 'Plus Jakarta Sans' },
    { id: 'arabic',      label: 'Amiri (Arabic/Urdu)' },
    { id: 'indic',       label: 'Noto Indic Script' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl max-w-sm w-full p-6 shadow-xl space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-stone-600 dark:text-stone-400" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              Reader Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4 text-stone-600 dark:text-stone-400" />
          </button>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2">
            Color Theme
          </label>
          <div className="grid grid-cols-4 gap-2">
            {themes.map(th => (
              <button
                key={th.id}
                onClick={() => updateSettings({ theme: th.id })}
                style={{ backgroundColor: th.bg, color: th.fg }}
                className={`p-2.5 rounded-lg border text-[11px] font-semibold transition-all ${
                  settings.theme === th.id
                    ? 'ring-2 ring-lime ring-offset-1'
                    : 'border-stone-200'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2">
            Typography
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {fonts.map(f => (
              <button
                key={f.id}
                onClick={() => updateSettings({ fontFamily: f.id })}
                className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                  settings.fontFamily === f.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Slider */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2">
            Font Size — {settings.fontSize}px
          </label>
          <input
            type="range"
            min={14} max={26} step={1}
            value={settings.fontSize}
            onChange={e => updateSettings({ fontSize: parseInt(e.target.value) })}
            className="w-full accent-stone-900"
          />
          <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-0.5">
            <span>14px</span>
            <span>26px</span>
          </div>
        </div>

        {/* Line Height Slider */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2">
            Line Spacing — {settings.lineHeight}×
          </label>
          <input
            type="range"
            min={1.4} max={2.4} step={0.1}
            value={settings.lineHeight}
            onChange={e => updateSettings({ lineHeight: parseFloat(e.target.value) })}
            className="w-full accent-stone-900"
          />
        </div>

        {/* Reset */}
        <button
          onClick={resetSettings}
          className="w-full text-xs font-mono text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:underline py-1 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};
