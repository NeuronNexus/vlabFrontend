interface MetricsPanelProps {
  comfort: number;
  meanWear: number;
  maxWear: number;
}

export function MetricsPanel({ comfort, meanWear, maxWear }: MetricsPanelProps) {
  const getComfortColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getComfortLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Poor';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Metrics
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Comfort Index</span>
          <div className="text-right">
            <div className={`font-mono text-xl font-semibold ${getComfortColor(comfort)}`}>
              {comfort.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">{getComfortLabel(comfort)}</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Mean Wear</span>
          <span className="font-mono text-lg text-foreground">
            {(meanWear * 100).toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Max Wear</span>
          <span className="font-mono text-lg text-foreground">
            {(maxWear * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
