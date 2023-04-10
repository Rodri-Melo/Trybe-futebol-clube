import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';
import verify from '../middlewares/token';

const Matches = Router();

Matches.get('/', MatchesController.getAllMatches);
Matches.patch('/:id/finish', verify.verify, MatchesController.finishMatches);
Matches.patch('/:id', verify.verify, MatchesController.updateInProgressMatches);
Matches.post('/', verify.verify, MatchesController.newMatches);

export default Matches;
