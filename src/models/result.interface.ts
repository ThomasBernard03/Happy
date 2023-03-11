import { Header } from "./header.interface"

export interface Result {
    guid : string
    requestGuid : string
    code : number
    status : string
    body : string
    headers : Array<Header>,
    date : number,
    time : number
}