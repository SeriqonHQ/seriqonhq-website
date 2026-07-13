interface AuditProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function AuditProgress({ currentStep, totalSteps }: AuditProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <div
        className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-label="Audit progress"
      />
    </div>
  );
}
