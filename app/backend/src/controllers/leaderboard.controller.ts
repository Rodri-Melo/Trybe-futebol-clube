import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

class LeaderboardController {
  static async getAllTeamsHome(req: Request, res: Response) {
    const all = await LeaderboardService.orderedHome();

    return res.status(200).json(all);
  }

  static async getAllTeamsAway(req: Request, res: Response) {
    const all = await LeaderboardService.orderedAway();

    return res.status(200).json(all);
  }
}

export default LeaderboardController;
