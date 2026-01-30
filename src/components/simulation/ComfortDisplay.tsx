/**
 * ComfortDisplay Component
 * Backend-driven comfort analysis
 */

import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface ComfortDisplayProps {
  result: {
    scenario_type: string;
    stability: string;
    alignment_regime: string;
    comfort_change: number;
  };
}

export function ComfortDisplay({ result }: ComfortDisplayProps) {
  const comfortColor =
    result.comfort_change > 0
      ? 'text-comfort-excellent'
      : result.comfort_change > -5
      ? 'text-comfort-moderate'
      : 'text-comfort-poor';

  return (
    <div className="sim-panel space-y-4">
      <div className="sim-panel-header">Comfort Analysis</div>

      <div className="rounded-lg p-4 border bg-secondary/30">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Scenario</span>
        </div>

        <p className="text-sm text-foreground">
          {result.scenario_type}
        </p>
      </div>

      <div className="rounded-lg p-4 border bg-secondary/30">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          Stability
        </div>
        <p className="text-sm">{result.stability}</p>
      </div>

      <div className="rounded-lg p-4 border bg-secondary/30">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          Alignment Regime
        </div>
        <p className="text-sm">{result.alignment_regime}</p>
      </div>

      <div className="rounded-lg p-4 border bg-secondary/30">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          Comfort Change
        </div>
        <p className={cn('text-lg font-mono font-semibold', comfortColor)}>
          {result.comfort_change.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
