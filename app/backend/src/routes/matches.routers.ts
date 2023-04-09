import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';

const Matches = Router();

Matches.get(
  '/',
  // MatchesController.getCompletedMatches,
  MatchesController.getAllMatches,
  // MatchesController.getInProgressMatches,

);

export default Matches;
