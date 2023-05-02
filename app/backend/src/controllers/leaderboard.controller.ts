import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

class LeaderboardController {
  static async getAllTeams(req: Request, res: Response) {
    const all = await LeaderboardService.orderByAll();

    return res.status(200).json(all);
  }
}

export default LeaderboardController;
