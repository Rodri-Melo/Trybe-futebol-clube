import { Request, Response } from 'express';
import TeamsService from '../services/teams.services';

class TeamsController {
  static async getAllTeams(req: Request, res: Response) {
    const teams = await TeamsService.getAllTeams();

    return res.status(200).json(teams);
  }

  static async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getTeamsById(+id);

    return res.status(200).json(team);
  }
}

export default TeamsController;
