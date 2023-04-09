import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const matches = await MatchesService.getAllMatches();

      return res.status(200).json(matches);
    }
    const matchesInProgress = await MatchesService.getInProgressMatches(inProgress === 'true');
    return res.status(200).json(matchesInProgress);
  }

  // static async getInProgressMatches(req: Request, res: Response) {
  //   const matches = await MatchesService.getInProgressMatches();

  //   return res.status(200).json(matches);
  // }

  // static async getCompletedMatches(req: Request, res: Response) {
  //   const matches = await MatchesService.getCompletedMatches();

  //   return res.status(200).json(matches);
  // }
}

export default MatchesController;
