/**
 * SimulationMetrics Component
 * Displays backend-derived metrics
 */

import { Activity, Gauge, TrendingUp } from 'lucide-react';

interface SimulationMetricsProps {
  state: {
    comfortIndex: number;
    meanWear: number;
    maxWear: number;
  };
}

export function SimulationMetrics({ state }: SimulationMetricsProps) {
  return (
    <div className="sim-panel">
      <div className="sim-panel-header flex items-center gap-2">
        <Activity className="w-4 h-4" />
        Simulation Metrics
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="metric-card">
          <div className="data-label flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Comfort Index
          </div>
          <div className="data-value">
            {state.comfortIndex.toFixed(1)}
          </div>
        </div>

        <div className="metric-card">
          <div className="data-label flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            Mean Wear
          </div>
          <div className="data-value">
            {(state.meanWear * 100).toFixed(1)}
            <span className="data-unit">%</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="data-label flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Max Wear
          </div>
          <div className="data-value">
            {(state.maxWear * 100).toFixed(1)}
            <span className="data-unit">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
