import { Router } from 'express';
import UserControler from '../controllers/users.controllers';
import { validateInput, validateUser } from '../middlewares/loginAuth';

const teamsRouter = Router();

teamsRouter.post('/', validateInput, validateUser, UserControler.login);

export default teamsRouter;
