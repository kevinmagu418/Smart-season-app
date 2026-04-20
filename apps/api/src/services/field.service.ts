import { prisma } from '../config/db';

/**
 * FieldService handles all business logic related to agricultural plots.
 */
export class FieldService {
  /**
   * Retrieves all fields based on user role. 
   * Admins see all fields, while Agents only see their assigned plots.
   */
  static async getAll(userId: string, role: string) {
    if (role === 'ADMIN') {
      return prisma.field.findMany({ include: { agent: true, updates: { orderBy: { createdAt: 'desc' }, take: 1 } } });
    }
    return prisma.field.findMany({
      where: { assignedAgentId: userId },
      include: { agent: true, updates: { orderBy: { createdAt: 'desc' }, take: 1 } }
    });
  }

  /**
   * Retrieves a single field by ID.
   * Enforces ownership checks for Agent-level access.
   */
  static async getById(id: string, userId: string, role: string) {
    const field = await prisma.field.findUnique({
      where: { id },
      include: { updates: { orderBy: { createdAt: 'desc' } }, agent: true }
    });
    
    if (!field) throw new Error('Field not found');
    
    if (role !== 'ADMIN' && field.assignedAgentId !== userId) {
      throw new Error('Forbidden');
    }
    
    return field;
  }

  /**
   * Creates a new field record.
   */
  static async create(data: any) {
    return prisma.field.create({ data });
  }

  /**
   * Updates field metadata or progress stage.
   */
  static async update(id: string, data: any) {
    if (data.plantingDate) data.plantingDate = new Date(data.plantingDate);
    return prisma.field.update({ where: { id }, data });
  }

  /**
   * Assigns a field to a specific agent.
   * Validates that the target user exists and has the AGENT role.
   */
  static async assignAgent(id: string, agentId: string) {
    const user = await prisma.user.findUnique({ where: { id: agentId } });
    if (!user || user.role !== 'AGENT') {
      throw new Error('Invalid agent ID');
    }
    return prisma.field.update({
      where: { id },
      data: { assignedAgentId: agentId },
    });
  }
}
