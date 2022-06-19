/**
 * Handles the logout request
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { IRequest, IResponse } from '../../../interfaces/vendors';
import { ISessionResponse } from '../../../interfaces/response/ISessionResponse';
import { InternalErrorResponse, SuccessResponse } from '../../../core/ApiResponse';

class Session {
    public static async perform(req: IRequest, res: IResponse): Promise<any> {
        try {
            let result: ISessionResponse;

            if (req.isAuthenticated()) {
                result = {
                    message: 'The session is active',
                    session: req.session
                };
                return new SuccessResponse('success', result).send(res);
            }

            result = {
                message: 'The session is inactive',
                session: null
            };
            return new SuccessResponse('success', result).send(res);
        } catch (error) {
            return new InternalErrorResponse('Error retrieving the session').send(res);
        }
    }
}

export default Session;