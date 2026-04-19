import { Response, NextFunction } from 'express';
import { UpdateService } from '../services/update.service';
import { AuthRequest } from '../types';

export class UpdateController {
  static async addUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.user!;
      const update = await UpdateService.addUpdate(id, userId, req.body);
      res.status(201).json(update);
    } catch (error) {
      next(error);
    }
  }

  static async getUpdates(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = await UpdateService.getUpdates(id);
      res.json(updates);
    } catch (error) {
      next(error);
    }
  }
}
