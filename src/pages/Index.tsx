/**
 * SoleSense - Main Application
 * Backend-driven simulation (Explicit Run)
 */

import { useState, useCallback } from 'react';
import { Footprints, Zap, AlertCircle, Loader2 } from 'lucide-react';

import { InputPanel } from '@/components/simulation/InputPanel';
import { PressureHeatmap } from '@/components/simulation/PressureHeatmap';
import { WearHeatmap } from '@/components/simulation/WearHeatmap';
import { ComfortDisplay } from '@/components/simulation/ComfortDisplay';
import { SimulationMetrics } from '@/components/simulation/SimulationMetrics';
import { WearSimulator } from '@/components/simulation/WearSimulator';
import { AssumptionsPanel } from '@/components/simulation/AssumptionsPanel';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { runSimulation, SimulationResponse } from '@/services/api';
import { SimulationConfig } from '@/simulation/types';

const DEFAULT_CONFIG: SimulationConfig = {
  bodyWeight: 70,
  footSize: 42,
  archType: 'normal',
  activityMode: 'walking',
  soleStiffness: 0.4,
  materialDurability: 0.6,
};

export default function Index() {
  /** Draft state (user edits) */
  const [draftConfig, setDraftConfig] = useState<SimulationConfig>(DEFAULT_CONFIG);

  /** Applied state (simulation snapshot) */
  const [appliedConfig, setAppliedConfig] = useState<SimulationConfig | null>(null);
  const [result, setResult] = useState<SimulationResponse | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState(0);

  const runBackendSimulation = useCallback(
    async (cfg: SimulationConfig, stepsToSimulate: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await runSimulation({
          body_weight: cfg.bodyWeight,
          foot_size: cfg.footSize,
          arch_type: cfg.archType,
          activity_mode: cfg.activityMode,
          sole_stiffness: cfg.soleStiffness,
          material_durability: cfg.materialDurability,
          steps: stepsToSimulate,
        });

        setAppliedConfig(cfg);
        setResult(response);
        setSteps(stepsToSimulate);
      } catch (err) {
        setResult(null);
        setError(err instanceof Error ? err.message : 'Simulation failed');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSimulate = useCallback(
    (stepsToSimulate: number) => {
      runBackendSimulation(draftConfig, stepsToSimulate);
    },
    [draftConfig, runBackendSimulation]
  );

  const handleReset = useCallback(() => {
    setAppliedConfig(null);
    setResult(null);
    setSteps(0);
  }, []);

  return (
    <div className="min-h-screen bg-background grid-lines">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center glow-primary">
              <Footprints className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-primary">SoleSense</h1>
              <p className="text-xs text-muted-foreground">
                Backend-Driven Pressure Simulation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3 h-3 text-primary" />
            Deterministic • Explainable • Comparative
          </div>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="container mx-auto px-4 pt-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="container mx-auto px-4 pt-8 flex justify-center text-muted-foreground gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Running simulation…
        </div>
      )}

      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-4">
            <InputPanel config={draftConfig} onChange={setDraftConfig} />
            <AssumptionsPanel />
          </div>

          {/* Visuals */}
          <div className="lg:col-span-6 space-y-4">
            {result ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <PressureHeatmap
                    grid={result.raw.final_pressure}
                    maxPressure={Math.max(...result.raw.final_pressure.flat(), 1)}
                    width={240}
                    height={400}
                    title="Pressure Distribution"
                  />
                  <WearHeatmap
                    grid={result.raw.final_wear}
                    width={240}
                    height={400}
                    title="Wear Accumulation"
                  />
                </div>

                <SimulationMetrics
                  state={{
                    comfortIndex: result.evidence.final_comfort,
                    meanWear: result.evidence.mean_wear,
                    maxWear: result.evidence.max_wear,
                  }}
                />
              </>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                Adjust parameters and click <b>Simulate</b>
              </div>
            )}
          </div>

          {/* Analysis */}
          <div className="lg:col-span-3 space-y-4">
            {result && <ComfortDisplay result={result.overview} />}
            <WearSimulator
              currentSteps={steps}
              onSimulate={handleSimulate}
              onReset={handleReset}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-4 text-center text-xs text-muted-foreground">
        SoleSense is for educational & comparative analysis only.
      </footer>
    </div>
  );
}
