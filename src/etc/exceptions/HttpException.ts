import { errors } from './error.handler'
class HttpException extends Error {
    id: string;
    message: string;
    constructor(errorCode: string) {
        super(errorCode);
        this.id = "NOTD";
        this.message = "Something went wrong";

        const error = errors.find(_err => {
            return _err.id === errorCode;
        });
        
        if(error) {
            this.id = error.id;
            this.message = error.message.fr;
        }
    }
}

export default HttpException;