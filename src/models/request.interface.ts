import { HttpVerb } from "./verb.enum"

export interface Request {
    id : string
    name : string
    method : HttpVerb
}