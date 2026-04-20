import { FieldStatus } from '@smartseason/types';
import { cn } from '../lib/utils';

export const StatusBadge = ({ status, className }: { status: FieldStatus, className?: string }) => {
  const isCompleted = status === FieldStatus.COMPLETED;
  const isAtRisk = status === FieldStatus.AT_RISK;
  const isActive = status === FieldStatus.ACTIVE;

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      isCompleted && "bg-slate-100 text-slate-700 border-slate-200",
      isAtRisk && "bg-red-50 text-red-700 border-red-200",
      isActive && "bg-green-50 text-green-700 border-green-200",
      className
    )}>
      {status}
    </span>
  );
};
