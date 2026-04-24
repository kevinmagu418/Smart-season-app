import { prisma } from '../config/db';
import { computeFieldStatus } from '../utils/status';
import { FieldStage } from '@smartseason/types';

/**
 * DashboardService provides aggregated metrics and activity summaries.
 */
export class DashboardService {
  /**
   * Generates dashboard statistics based on user role.
   * Admin receives system-wide counts, Agents receive personal field lists and recent activities.
   */
  static async getStats(userId: string, role: string) {
    const fields = await prisma.field.findMany({
      where: role === 'ADMIN' ? {} : { assignedAgentId: userId },
      include: { updates: { orderBy: { createdAt: 'desc' }, take: 1 } }
    });

    let activeCount = 0;
    let atRiskCount = 0;
    let completedCount = 0;

    fields.forEach((f: any) => {
      const lastUpdate = f.updates.length > 0 ? f.updates[0].createdAt : undefined;
      const status = computeFieldStatus(f.stage as FieldStage, f.plantingDate, lastUpdate);
      
      if (status === 'Completed') completedCount++;
      else if (status === 'At Risk') atRiskCount++;
      else activeCount++;
    });

    const summary = {
      totalFields: fields.length,
      activeCount,
      atRiskCount,
      completedCount,
    };

    if (role === 'ADMIN') {
      return summary;
    } else {
      const recentUpdates = await prisma.fieldUpdate.findMany({
        where: { agentId: userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { field: true }
      });

      return {
        ...summary,
        assignedFields: fields,
        recentUpdates,
      };
    }
  }
}
