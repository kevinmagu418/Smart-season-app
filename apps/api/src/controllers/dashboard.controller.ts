import { Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { AuthRequest } from '../types';

export class DashboardController {
  static async getDashboardStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { userId, role } = req.user!;
      const stats = await DashboardService.getStats(userId, role);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}
