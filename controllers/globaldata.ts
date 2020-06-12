//SPDX-License-Identifier: MIT
//(c)2020 EM~ eetu@kkona.xyz

import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { env, VERSION } from "../server.ts";
import db from "../config/db.ts";
import { Iworkitem, Ivalidate } from '../config/interface.ts';
const database = db.getDatabase;
const workitems = database.collection("workitems");
export { rootMsg, getStats };

const rootMsg: HandlerFunc = async (c: Context) => {
    try {
        const response = `clN22 workitem-manager v${VERSION} (deno)`;
        return c.json(response, 200);
    } catch (error) {
        return c.json(error, 500);
    }
}

const getStats: HandlerFunc = async (c: Context) => {
    try {
        let totalItems = await getCount('totalItems');
        let waiting = await getCount('waiting');
        let working = await getCount('working');
        let expired = await getCount('expired');
        let retVal = { totalItems, waiting, working, expired };
        return c.json(retVal, 200);
    } catch (error) {
        return c.json(error, 500);
    }
};
async function getCount (resToFind: string) {
    var tmpCounter = 0;
    if (resToFind != 'totalItems') {
        for (const workitem of await workitems.find({'result': resToFind})) {
            tmpCounter++;
        }
    } else {
        for (const workitem of await workitems.find()) {
            tmpCounter++;
        }
    }
        return tmpCounter;
}