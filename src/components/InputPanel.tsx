import { User, Ruler, Footprints, Gauge, Shield } from 'lucide-react';
import { SimulationConfig, ArchType, ActivityMode } from '@/types/simulation';
import { Slider } from './Slider';
import { ToggleGroup } from './ToggleGroup';

interface InputPanelProps {
  config: SimulationConfig;
  onChange: (config: SimulationConfig) => void;
}

export function InputPanel({ config, onChange }: InputPanelProps) {
  const update = (partial: Partial<SimulationConfig>) => {
    onChange({ ...config, ...partial });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        <Gauge className="w-4 h-4" />
        Input Parameters
      </div>

      <Slider
        value={config.bodyWeight}
        onChange={(v) => update({ bodyWeight: v })}
        min={40}
        max={150}
        step={1}
        label="Body Weight"
        unit="kg"
        icon={<User className="w-4 h-4" />}
      />

      <Slider
        value={config.footSize}
        onChange={(v) => update({ footSize: v })}
        min={35}
        max={48}
        step={0.5}
        label="Foot Size (EU)"
        unit=""
        icon={<Ruler className="w-4 h-4" />}
      />

      <ToggleGroup
        value={config.archType}
        onChange={(v) => update({ archType: v as ArchType })}
        options={[
          { value: 'flat', label: 'Flat' },
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
        ]}
        label="Arch Type"
        icon={<Footprints className="w-4 h-4" />}
      />

      <ToggleGroup
        value={config.activityMode}
        onChange={(v) => update({ activityMode: v as ActivityMode })}
        options={[
          { value: 'standing', label: 'Standing' },
          { value: 'walking', label: 'Walking' },
        ]}
        label="Activity Mode"
        icon={<Footprints className="w-4 h-4" />}
      />

      <Slider
        value={config.soleStiffness}
        onChange={(v) => update({ soleStiffness: v })}
        min={0}
        max={1}
        step={0.05}
        label="Sole Stiffness"
        unit={config.soleStiffness < 0.33 ? 'Soft' : config.soleStiffness < 0.66 ? 'Medium' : 'Rigid'}
        icon={<Gauge className="w-4 h-4" />}
      />

      <Slider
        value={config.materialDurability}
        onChange={(v) => update({ materialDurability: v })}
        min={0}
        max={1}
        step={0.05}
        label="Material Durability"
        unit={config.materialDurability < 0.33 ? 'Low' : config.materialDurability < 0.66 ? 'Medium' : 'High'}
        icon={<Shield className="w-4 h-4" />}
      />
    </div>
  );
}
