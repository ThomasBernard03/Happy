import { RequestMethod } from "./enums/request-method"
import { Header } from "./header.interface"
import { Result } from "./result.interface"

export interface Request {
    guid : string
    projectGuid : string
    name : string
    method : RequestMethod
    url : string
    body : string,
    headers : Header[],
    notes : string,
    result? : Result
}