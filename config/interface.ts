import { DateTimeFormat } from "https://deno.land/std/datetime/mod.ts";
interface Iworkitem {
    _id: { $oid: string },
    uid: string,
    workitem: string,
    result: string,
    created: DateTimeFormat,
    statDevice: string,
    statSpeed: number,
    statWTime: number
};
interface Ivalidate {
    workitem: string,
    result: string,
    expectedRound: string,
    acceptTime: string
};
export { Iworkitem, Ivalidate };