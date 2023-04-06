import { Router, Request, Response } from 'express';
import UserControler from '../controllers/users.controllers';
import { validateInput, validateUser } from '../middlewares/loginAuth';
import verify from '../middlewares/token';

const teamsRouter = Router();

teamsRouter.post('/', validateInput, validateUser, UserControler.login);

teamsRouter.get('/role', verify.verify, (req: Request, res: Response) => {
  const { role } = req.body.user;
  return res.status(200).json({ role });
});

export default teamsRouter;
