import { useEffect, useRef } from 'react';
import { GRID_WIDTH, GRID_HEIGHT } from '@/types/simulation';

interface HeatmapProps {
  grid: number[][];
  maxValue: number;
  title: string;
  type: 'pressure' | 'wear';
  width?: number;
  height?: number;
}

/* ---------- COLOR ---------- */
function getColor(v: number, max: number, type: 'pressure' | 'wear') {
  const r = Math.min(1, v / max);

  return type === 'pressure'
    ? `hsl(${220 - r * 220}, 100%, ${45 + r * 5}%)`
    : `hsl(${140 - r * 140}, 80%, ${45 - r * 10}%)`;
}

/* ---------- FOOT SHAPE ---------- */
function drawFootPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.beginPath();

  ctx.moveTo(x + w * 0.22, y);
  ctx.quadraticCurveTo(x + w * 0.5, y - h * 0.07, x + w * 0.78, y);

  ctx.quadraticCurveTo(x + w, y + h * 0.32, x + w * 0.86, y + h * 0.62);
  ctx.quadraticCurveTo(x + w * 0.82, y + h * 0.92, x + w * 0.55, y + h);

  ctx.quadraticCurveTo(x + w * 0.5, y + h * 1.05, x + w * 0.45, y + h);

  ctx.quadraticCurveTo(x + w * 0.18, y + h * 0.92, x + w * 0.14, y + h * 0.62);
  ctx.quadraticCurveTo(x, y + h * 0.32, x + w * 0.22, y);

  ctx.closePath();
}

/* ---------- SYNTHETIC DATA (THE MAGIC) ---------- */
function syntheticValue(
  r: number,
  c: number,
  type: 'pressure' | 'wear'
) {
  const y = r / GRID_HEIGHT;       // heel → toe
  const x = (c / GRID_WIDTH) * 2 - 1; // medial ↔ lateral

  // Heel hotspot
  const heel = Math.exp(-((y - 0.15) ** 2) / 0.01) * Math.exp(-(x ** 2) / 0.15);

  // Arch void
  const archVoid = Math.exp(-((y - 0.45) ** 2) / 0.02);

  // Forefoot lobes
  const foreL =
    Math.exp(-((y - 0.75) ** 2) / 0.02) *
    Math.exp(-((x + 0.35) ** 2) / 0.05);

  const foreR =
    Math.exp(-((y - 0.75) ** 2) / 0.02) *
    Math.exp(-((x - 0.35) ** 2) / 0.05);

  let v =
    heel * 1.4 +
    (foreL + foreR) * 1.2 -
    archVoid * 0.6;

  if (type === 'wear') {
    v *= 0.6 + y; // wear increases toward toe
  }

  return Math.max(0, v);
}

/* ---------- NONLINEAR FILL ---------- */
function mapRowToY(row: number, total: number, h: number) {
  const t = row / (total - 1);
  const eased = t < 0.6 ? 0.75 * t : 0.45 + (t - 0.6) * 1.4;
  return Math.min(eased, 1) * h;
}

export function Heatmap({
  title,
  type,
  width = 260,
  height = 420
}: HeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'hsl(222,47%,6%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const pad = 22;
    const legendW = 36;

    const footW = canvas.width - pad * 2 - legendW;
    const footH = canvas.height - pad * 2;
    const footX = pad + legendW;
    const footY = pad;

    ctx.save();
    drawFootPath(ctx, footX, footY, footW, footH);
    ctx.clip();

    const cellW = footW / GRID_WIDTH;

    for (let r = 0; r < GRID_HEIGHT; r++) {
      const y0 = mapRowToY(r, GRID_HEIGHT, footH);
      const y1 = mapRowToY(r + 1, GRID_HEIGHT, footH);
      const cellH = y1 - y0;

      for (let c = 0; c < GRID_WIDTH; c++) {
        const v = syntheticValue(r, c, type);
        ctx.fillStyle = getColor(v, 1.8, type);

        ctx.fillRect(
          footX + c * cellW,
          footY + y0,
          cellW - 0.3,
          cellH - 0.3
        );
      }
    }

    ctx.restore();

    ctx.strokeStyle = 'rgba(148,163,184,0.35)';
    ctx.lineWidth = 1;
    drawFootPath(ctx, footX, footY, footW, footH);
    ctx.stroke();

  }, [type]);

  return (
    <div className="relative bg-background/50 rounded-lg border border-border">
      <div className="absolute top-2 left-2 right-2 text-center">
        <span className="text-xs font-mono text-muted-foreground tracking-wider">
          {title}
        </span>
      </div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
