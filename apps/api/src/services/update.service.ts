import { prisma } from '../config/db';

export class UpdateService {
  static async addUpdate(fieldId: string, agentId: string, data: any) {
    const { note, stage } = data;

    const field = await prisma.field.findUnique({ where: { id: fieldId } });
    if (!field) throw new Error('Field not found');

    const update = await prisma.fieldUpdate.create({
      data: { note, stage, fieldId, agentId }
    });

    if (stage && stage !== field.stage) {
      await prisma.field.update({ where: { id: fieldId }, data: { stage } });
    }

    return update;
  }

  static async getUpdates(fieldId: string) {
    return prisma.fieldUpdate.findMany({
      where: { fieldId },
      orderBy: { createdAt: 'desc' },
      include: { agent: true }
    });
  }
}
