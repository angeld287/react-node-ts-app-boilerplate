/**
 * Get the html body of a web page
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { validationResult } from 'express-validator';
import { IRequest, IResponse } from '../../../interfaces/vendors';
import Log from '../../../middlewares/Log';
var request = require('request');

class PageSource {
    public static async getPageSource(req: IRequest, res: IResponse): Promise<any> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                errors: errors.array()
            });
        }

        request(req.body.url, function (error, response, body) {
            if (error !== null) {
                return res.status(400).json({ success: false, url: req.body.url, response: null, error: error })
            }
            return res.json({ success: true, url: req.body.url, response: response, error: null })
        });
    }
}

export default PageSource;