import { prisma } from '../config/db';
import { computeFieldStatus } from '../utils/status';
import { FieldStage } from '@smartseason/types';

export class DashboardService {
  static async getStats(userId: string, role: string) {
    if (role === 'ADMIN') {
      const fields = await prisma.field.findMany({ include: { updates: { orderBy: { createdAt: 'desc' }, take: 1 } } });
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

      return {
        totalFields: fields.length,
        activeCount,
        atRiskCount,
        completedCount,
      };
    } else {
      const assignedFields = await prisma.field.findMany({
        where: { assignedAgentId: userId },
        include: { updates: { orderBy: { createdAt: 'desc' }, take: 1 } }
      });

      const recentUpdates = await prisma.fieldUpdate.findMany({
        where: { agentId: userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { field: true }
      });

      return {
        assignedFields,
        recentUpdates,
      };
    }
  }
}
