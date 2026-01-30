import { Play, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface SimulationControlsProps {
  steps: number;
  onStepsChange: (steps: number) => void;
  onSimulate: () => void;
  onReset: () => void;
  isLoading: boolean;
  hasResults: boolean;
}

export function SimulationControls({
  steps,
  onStepsChange,
  onSimulate,
  onReset,
  isLoading,
  hasResults,
}: SimulationControlsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Simulation Controls
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">Steps to Simulate</label>
        <input
          type="number"
          value={steps}
          onChange={(e) => onStepsChange(Math.max(0, Number(e.target.value)))}
          min="0"
          max="10000"
          step="100"
          className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground font-mono"
        />
        <p className="text-xs text-muted-foreground">
          Each step represents one footfall
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onSimulate}
          disabled={isLoading || steps === 0}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          {isLoading ? 'Running...' : 'Simulate'}
        </Button>
        {hasResults && (
          <Button variant="secondary" onClick={onReset} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
