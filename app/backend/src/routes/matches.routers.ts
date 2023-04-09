import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';

const Matches = Router();

Matches.get('/', MatchesController.getAllMatches);

export default Matches;
