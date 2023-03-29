import { Router } from 'express';
import TeamsController from '../controllers/teams.controllers';

const teamsRouter = Router();

teamsRouter.get('/', TeamsController.getAllTeams);

export default teamsRouter;
