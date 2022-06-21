/**
 * Define Login Login for the API
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import Encryptions from '../../../providers/Encryptions'

import { validationResult } from 'express-validator';
import Log from '../../../middlewares/Log';
import IUser from "../../../interfaces/models/User";
import IUserService from "../../../interfaces/IUserService";
import userService from '../../../services/userService';
var passport = require('passport');
import { IResponse, IRequest, INext } from '../../../interfaces/vendors';
import { BadRequestResponse } from '../../../core/ApiResponse';


class Login {

    /**
     * Execute the action of login an user if the inputs are valid
     * @param {string} req: get the request from the post
     * @param {string} res: the response expected by the post
     * @return {Promise<>} return a promise with the json result
     */
    public static async perform(req: IRequest, res: IResponse, next: INext): Promise<any> {
        try {
            const errors = validationResult(req);
            let user: IUserService = new userService();

            if (!errors.isEmpty()) {
                return new BadRequestResponse('Validation Error', {
                    errors: errors.array()
                }).send(res);
            }

            const _username = req.body.username.toLowerCase();
            const _password = Encryptions.hash(req.body.password);
            req.body.password = _password;

            const _user = await user.validateUser(_username, _password);

            if (_user === false) {
                return res.json({
                    error: true,
                    message: 'Invalid Username or Password',
                });
            }

            Log.info(`New user logged ` + _username);

            let userObject: IUser = {
                id: _user.id,
                email: _user.email,
                phoneNumber: _user.phone_number,
                passwordResetToken: _user.password_reset_token,
                passwordResetExpires: _user.password_reset_expires,
                fullname: _user.fullname,
                gender: _user.gender,
                profile: _user.profile,
                userName: _user.user_name,
            };

            passport.authenticate('local', (err: any, user: any, info: any) => {
                Log.info('Here in the login controller #2!');

                if (err) {
                    return next(err);
                }

                if (info) {
                    return res.json({
                        error: true,
                        msg: info.message || info.msg,
                    });
                }

                return req.logIn({ ...userObject }, () => {
                    return res.json({
                        session: req.session.passport.user,
                        token: req.session.passport.token,
                    })
                });

            })(req, res, next);

        } catch (error) {
            Log.error(`Internal Server Error ` + error);
            return res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    }
}

export default Login;