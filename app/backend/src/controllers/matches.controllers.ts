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

  static async finishMatches(req: Request, res: Response) {
    const { id } = req.params;

    const finish = await MatchesService.finishMatches(+id);
    return res.status(200).json(finish);
  }
}

export default MatchesController;
