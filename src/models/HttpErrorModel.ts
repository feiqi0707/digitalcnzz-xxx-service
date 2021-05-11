import { HttpStatusCodeModel } from './HttpStatusCodeModel'

/**
 * 自定义HttpError
 *
 * @author digitalcnzz
 * @date 2021-01-04
 * @export
 * @class HttpError
 * @extends {Error}
 */
export class HttpErrorModel extends Error {
    statusCode: HttpStatusCodeModel
    constructor(statusCode: HttpStatusCodeModel, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}