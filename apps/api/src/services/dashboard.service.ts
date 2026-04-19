import { prisma } from '../config/db';
import { computeFieldStatus } from '../utils/status';
import { FieldStage } from '@smartseason/types';

export class DashboardService {
  static async getStats(userId: string, role: string) {
    let fields = [];
    if (role === 'ADMIN') {
      fields = await prisma.field.findMany({ include: { updates: { orderBy: { createdAt: 'desc' }, take: 1 } } });
    } else {
      fields = await prisma.field.findMany({
        where: { assignedAgentId: userId },
        include: { updates: { orderBy: { createdAt: 'desc' }, take: 1 } }
      });
    }

    let activeCount = 0;
    let atRiskCount = 0;
    let completedCount = 0;

    fields.forEach(f => {
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
      recentUpdates: [] // could fetch recent globally here later
    };
  }
}
