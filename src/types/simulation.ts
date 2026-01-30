// Simulation Types
export type ArchType = 'flat' | 'normal' | 'high';
export type ActivityMode = 'standing' | 'walking';

export interface SimulationConfig {
  bodyWeight: number;
  footSize: number;
  archType: ArchType;
  activityMode: ActivityMode;
  soleStiffness: number;
  materialDurability: number;
}

export interface SimulationResult {
  overview: {
    scenario_type: string;
    stability: string;
    alignment_regime: string;
    comfort_change: number;
  };
  evidence: {
    final_comfort: number;
    mean_wear: number;
    max_wear: number;
  };
  raw: {
    final_pressure: number[][];
    final_wear: number[][];
  };
}

export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 40;
