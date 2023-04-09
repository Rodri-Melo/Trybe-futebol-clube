import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';
import verify from '../middlewares/token';

const Matches = Router();

Matches.get('/', MatchesController.getAllMatches);
Matches.patch('/:id/finish', verify.verify, MatchesController.finishMatches);

export default Matches;
