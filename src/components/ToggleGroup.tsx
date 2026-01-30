interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: ToggleOption[];
  label: string;
  icon?: React.ReactNode;
}

export function ToggleGroup({ value, onChange, options, label, icon }: ToggleGroupProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm flex items-center gap-2 text-foreground">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {label}
      </div>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              value === option.value
                ? 'bg-primary text-background'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
