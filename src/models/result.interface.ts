import { Header } from "./header.interface"

export class Result {
    guid : string = ""
    requestGuid : string = ""
    code : number = 0
    status : string = ""
    body : string = ""
    headers : Array<Header> = []
    date : number = 0
    time : number = 0
}