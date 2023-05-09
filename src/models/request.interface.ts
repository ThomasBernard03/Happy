import { HttpVerb } from "./verb.enum"

export interface Request {
    guid : string
    name : string
    method : HttpVerb
}