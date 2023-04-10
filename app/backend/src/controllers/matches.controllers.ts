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
    await MatchesService.finishMatches(+id);
    return res.status(200).json({ message: 'Finished' });
  }

  static async updateInProgressMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchesService.updateInProgressMatches(+id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'updated' });
  }

  static async newMatches(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    const result = await MatchesService
      .newMatches(homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals);

    return res.status(201).json(result);
  }
}

export default MatchesController;
