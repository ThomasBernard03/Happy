export interface Result {
    guid : string
    requestGuid : string
    code : number
    status : string
    body : string
    headers : Map<string, string[]>,
    date : Date,
    time : number
}