import { FieldStage, FieldStatus } from '@smartseason/types';

export function computeFieldStatus(
  stage: FieldStage,
  plantingDate: Date,
  lastUpdateDate?: Date
): FieldStatus {
  if (stage === FieldStage.HARVESTED) {
    return FieldStatus.COMPLETED;
  }

  const now = new Date();

  // Helper to calculate days diff
  const getDaysDiff = (start: Date, end: Date) => {
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Check if stuck in PLANTED too long (> 14 days)
  if (stage === FieldStage.PLANTED) {
    const daysSincePlanted = getDaysDiff(plantingDate, now);
    if (daysSincePlanted > 14) {
      return FieldStatus.AT_RISK;
    }
  }

  // Check for no updates in the last 7 days
  const referenceDate = lastUpdateDate || plantingDate;
  const daysSinceLastUpdate = getDaysDiff(referenceDate, now);
  if (daysSinceLastUpdate > 7) {
    return FieldStatus.AT_RISK;
  }

  return FieldStatus.ACTIVE;
}
