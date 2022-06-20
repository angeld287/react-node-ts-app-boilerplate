import { ResultFactory, ValidationError, validationResult } from 'express-validator';
import { BadRequestResponse, SuccessResponse } from '../core/ApiResponse';

class ExpressValidator {
    public validationResult: any;

    constructor() {
        this.validationResult = (req: any, res: any) => {

            let error: any = validationResult.withDefaults({
                formatter: error => {
                    return {
                        ...error
                    };
                },
            })(req)

            console.log(error.errors[0]);


            return new SuccessResponse('success', error.errors[0]).send(res);
        }
    }
}

export default ExpressValidator;