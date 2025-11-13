import express from 'express';
import { getAllUsers } from '../application/user';
import { Authenticate } from './middleware/authentication';
import { Authorization } from './middleware/authorization';

const UserRouter= express.Router();

UserRouter.route('/').get(Authenticate,Authorization,getAllUsers)

export default UserRouter;