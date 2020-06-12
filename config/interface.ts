//SPDX-License-Identifier: MIT
//(c)2020 EM~ eetu@kkona.xyz

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
interface User {
    id: number,              // since it's an array
    uid: string,             // user id
    OwnedLabel: string,      // wuid for worker ids, nuid for node ids
    OwnedKey: string         // wuid / nuid
}

interface User extends Array<User>{} 

export { Iworkitem, Ivalidate, User };