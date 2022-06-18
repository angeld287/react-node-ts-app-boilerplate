/**
 * Handles the logout request
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { IRequest, IResponse } from '../../../interfaces/vendors';

class Session {
    public static async perform(req: IRequest, res: IResponse): Promise<any> {
        if (req.isAuthenticated()) {
            return res.status(200).json({
                msg: 'The session is active',
                session: req.session
            });
        }

        return res.status(200).json({
            msg: 'The session is inactive',
            session: null
        });
    }
}

export default Session;