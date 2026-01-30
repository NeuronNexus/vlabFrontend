import { SimulationResult } from '@/types/simulation';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export async function runSimulation(params: {
  body_weight: number;
  foot_size: number;
  arch_type: string;
  activity_mode: string;
  sole_stiffness: number;
  material_durability: number;
  steps: number;
}): Promise<SimulationResult> {
  const response = await fetch(`${API_URL}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Simulation failed' }));
    throw new Error(error.message || 'Failed to connect to backend');
  }

  return response.json();
}
