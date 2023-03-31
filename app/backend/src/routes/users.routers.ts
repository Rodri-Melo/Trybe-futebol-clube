import { Router } from 'express';
import UserControler from '../controllers/users.controllers';
import loginAuth from '../middlewares/loginAuth';

const teamsRouter = Router();

teamsRouter.post('/', loginAuth, UserControler.login);

export default teamsRouter;
