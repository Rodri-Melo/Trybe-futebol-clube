import { Request, Response } from 'express';
import TeamsService from '../services/teams.services';

class TeamsController {
  static async getAllTeams(req: Request, res: Response) {
    const teams = await TeamsService.getAllTeams();

    return res.status(200).json(teams);
  }
}

export default TeamsController;
