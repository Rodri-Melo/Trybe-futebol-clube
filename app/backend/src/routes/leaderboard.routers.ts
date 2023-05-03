import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leader = Router();

leader.get('/home', LeaderboardController.getAllTeamsHome);
leader.get('/away', LeaderboardController.getAllTeamsAway);

export default leader;
