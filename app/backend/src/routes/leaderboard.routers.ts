import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leader = Router();

leader.get('/home', LeaderboardController.getAllTeamsHome);
leader.get('/away', LeaderboardController.getAllTeamsAway);
leader.get('/', LeaderboardController.getAllTeams);

export default leader;
