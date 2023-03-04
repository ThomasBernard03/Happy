import { RequestMethod } from "./enums/request-method"

export interface Request {
    guid : string
    projectGuid : string
    name : string
    method : RequestMethod
    url : string
    body : string
}