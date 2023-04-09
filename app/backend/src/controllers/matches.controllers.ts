import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const matches = await MatchesService.getAllMatches();

    return res.status(200).json(matches);
  }
}

export default MatchesController;
