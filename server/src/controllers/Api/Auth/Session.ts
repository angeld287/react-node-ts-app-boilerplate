/**
 * Handles the logout request
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { IRequest, IResponse } from '../../../interfaces/vendors';
import { ISessionResponse } from '../../../interfaces/response/ISessionResponse';

class Session {
    public static async perform(req: IRequest, res: IResponse): Promise<any> {
        let result: ISessionResponse;
        if (req.isAuthenticated()) {
            result = {
                message: 'The session is inactive',
                session: req.session
            };
            return res.status(200).json(result);
        }

        result = {
            message: 'The session is inactive',
            session: null
        };
        return res.status(200).json(result);
    }
}

export default Session;