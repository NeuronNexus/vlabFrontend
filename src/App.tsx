import { useState } from 'react';
import { Footprints, Zap, AlertCircle, Loader2 } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { Heatmap } from './components/Heatmap';
import { SimulationControls } from './components/SimulationControls';
import { MetricsPanel } from './components/MetricsPanel';
import { SimulationConfig, SimulationResult } from './types/simulation';
import { runSimulation } from './utils/api';

const DEFAULT_CONFIG: SimulationConfig = {
  bodyWeight: 70,
  footSize: 42,
  archType: 'normal',
  activityMode: 'walking',
  soleStiffness: 0.4,
  materialDurability: 0.6,
};

export default function App() {
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [steps, setSteps] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await runSimulation({
        body_weight: config.bodyWeight,
        foot_size: config.footSize,
        arch_type: config.archType,
        activity_mode: config.activityMode,
        sole_stiffness: config.soleStiffness,
        material_durability: config.materialDurability,
        steps,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background grid-lines">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center glow-primary">
              <Footprints className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">SoleSense</h1>
              <p className="text-xs text-muted-foreground">
                Backend-Driven Pressure Simulation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3 h-3 text-primary" />
            Deterministic • Explainable
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="container mx-auto px-4 pt-4">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="container mx-auto px-4 pt-8 flex justify-center items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Running simulation…</span>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Inputs */}
          <div className="lg:col-span-3 space-y-4">
            <InputPanel config={config} onChange={setConfig} />
          </div>

          {/* Center Panel - Visualizations */}
          <div className="lg:col-span-6 space-y-4">
            {result ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Heatmap
                    grid={result.raw.final_pressure}
                    maxValue={Math.max(...result.raw.final_pressure.flat(), 1)}
                    title="Pressure Distribution"
                    type="pressure"
                    width={240}
                    height={400}
                  />
                  <Heatmap
                    grid={result.raw.final_wear}
                    maxValue={Math.max(...result.raw.final_wear.flat(), 0.01)}
                    title="Wear Accumulation"
                    type="wear"
                    width={240}
                    height={400}
                  />
                </div>
                <MetricsPanel
                  comfort={result.evidence.final_comfort}
                  meanWear={result.evidence.mean_wear}
                  maxWear={result.evidence.max_wear}
                />
              </>
            ) : (
              <div className="text-center text-muted-foreground py-24 bg-card border border-border rounded-lg">
                <p>Adjust parameters and click <strong>Simulate</strong></p>
              </div>
            )}
          </div>

          {/* Right Panel - Controls */}
          <div className="lg:col-span-3 space-y-4">
            <SimulationControls
              steps={steps}
              onStepsChange={setSteps}
              onSimulate={handleSimulate}
              onReset={handleReset}
              isLoading={isLoading}
              hasResults={result !== null}
            />
            
            {result && (
              <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Analysis
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Scenario:</span>{' '}
                    {result.overview.scenario_type}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Stability:</span>{' '}
                    {result.overview.stability}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Regime:</span>{' '}
                    {result.overview.alignment_regime}
                  </p>
                </div>
              </div>
            )}
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
