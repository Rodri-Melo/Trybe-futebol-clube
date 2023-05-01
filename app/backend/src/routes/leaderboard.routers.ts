import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leader = Router();

leader.get('/home', LeaderboardController.getAllTeams);

export default leader;
