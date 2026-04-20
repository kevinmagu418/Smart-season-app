import { Response, NextFunction } from 'express';
import { FieldService } from '../services/field.service';
import { AuthRequest } from '../types';

export class FieldController {
  static async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { userId, role } = req.user!;
      const fields = await FieldService.getAll(userId, role);
      res.json(fields);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, role } = req.user!;
      const field = await FieldService.getById(id, userId, role);
      res.json(field);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const field = await FieldService.create(req.body);
      res.status(201).json(field);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const field = await FieldService.update(id, req.body);
      res.json(field);
    } catch (error) {
      next(error);
    }
  }

  static async assign(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { agentId } = req.body;
      const field = await FieldService.assignAgent(id, agentId);
      res.json(field);
    } catch (error) {
      next(error);
    }
  }
}
