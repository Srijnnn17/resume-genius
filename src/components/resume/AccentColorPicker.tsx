import { Check } from 'lucide-react';

export type AccentColor = 'blue' | 'indigo' | 'purple' | 'green' | 'red' | 'orange' | 'teal' | 'pink' | 'gray' | 'black';

interface AccentColorPickerProps {
  selected: AccentColor;
  onChange: (color: AccentColor) => void;
}

const accentColors: { name: AccentColor; color: string; label: string }[] = [
  { name: 'blue', color: '#3B82F6', label: 'Blue' },
  { name: 'indigo', color: '#6366F1', label: 'Indigo' },
  { name: 'purple', color: '#A855F7', label: 'Purple' },
  { name: 'green', color: '#22C55E', label: 'Green' },
  { name: 'red', color: '#EF4444', label: 'Red' },
  { name: 'orange', color: '#F97316', label: 'Orange' },
  { name: 'teal', color: '#14B8A6', label: 'Teal' },
  { name: 'pink', color: '#EC4899', label: 'Pink' },
  { name: 'gray', color: '#6B7280', label: 'Gray' },
  { name: 'black', color: '#1F2937', label: 'Black' },
];

export const accentColorMap: Record<AccentColor, string> = {
  blue: '#3B82F6',
  indigo: '#6366F1',
  purple: '#A855F7',
  green: '#22C55E',
  red: '#EF4444',
  orange: '#F97316',
  teal: '#14B8A6',
  pink: '#EC4899',
  gray: '#6B7280',
  black: '#1F2937',
};

export function AccentColorPicker({ selected, onChange }: AccentColorPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-3 p-2">
      {accentColors.map((accent) => (
        <button
          key={accent.name}
          onClick={() => onChange(accent.name)}
          className="flex flex-col items-center gap-1.5 group"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ backgroundColor: accent.color }}
          >
            {selected === accent.name && (
              <Check className="h-5 w-5 text-white" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">{accent.label}</span>
        </button>
      ))}
    </div>
  );
}
