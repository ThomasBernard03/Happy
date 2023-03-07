import { RequestMethod } from "./enums/request-method"
import { Result } from "./result.interface"

export interface Request {
    guid : string
    projectGuid : string
    name : string
    method : RequestMethod
    url : string
    body : string,
    result? : Result
}