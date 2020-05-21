import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { env, VERSION } from "../server.ts";
import db from "../config/db.ts";
import { Iworkitem, Ivalidate } from '../config/interface.ts';
const database = db.getDatabase;
const workitems = database.collection("workitems");
const ident = database.collection("ident");
const validateData: Ivalidate = JSON.parse(Deno.readTextFileSync('./config/validate.json'));
const benchmarkData: Ivalidate = JSON.parse(Deno.readTextFileSync('./config/benchmark.json'));
export { rootMsg, wPostNew, getStats, workRequest, workGetSingle, workUpdItem, removeItem };
const rootMsg: HandlerFunc = async (c: Context) => {
    try {
        const allItems: Iworkitem[] = await workitems.find();
        //const response = `clN22 workitem-manager v${VERSION} (deno)`;
        return c.json(allItems, 200);
    } catch (error) {
        return c.json(error, 500);
    }
}
const workRequest: HandlerFunc = async (c: Context) => {
    // /wreq (require uid & deviceid)
    // match worker-id with assigned node(s), verify validity, see if benchmarked with current sets (force new benchmarking-session if not)
    // return the oldest, non-expired workitem (with ownership) available / if worker != "admin", return 'admin'-workitem every now and then (1/4 ? 1/8 ?)
    // return id, workitem & result (reserved etc)
    try {
        return c.json('meh',200);
    } catch (error) {
        return c.json(error,500);
    }
}
const workGetSingle: HandlerFunc = async (c: Context) => {
    try {
        const body = await (c.body());
        if (!Object.keys(body).length) {
            return c.string("Empty request!", 400);
        }
        const { id } = c.params as { id: string };
        const fetchItem = await workitems.findOne({ _id: { "$oid":id } });
        return c.json(fetchItem,200);
    } catch (error) {
        return c.json(error,500);
    }
}
const workUpdItem: HandlerFunc = async (c: Context) => {
    // allow: node to expire it's own workitems & worker to update it's progress & final result (waiting->reserved->working->success/failure)
    try {
        const { id } = c.params as { id: string };
        const fetchItem = await workitems.findOne({ _id: { "$oid":id } });
        return c.json('meh',200);
    } catch (error) {
        return c.json(error,500);
    }
}
const removeItem: HandlerFunc = async (c: Context) => {
    // permanently remove finished work from db, only finished/failed workitems, and only after node has received some result
    try {
        const { id } = c.params as { id: string };
        const fetchItem = await workitems.findOne({ _id: { "$oid":id } });
        return c.json('meh',200);
    } catch (error) {
        return c.json(error,500);
    }
}
const wPostNew: HandlerFunc = async (c: Context) => {
    try {
        const body = await (c.body());
        if (!Object.keys(body).length) {
            return c.string("Empty request!", 400);
        }
        const { workitem, result, created = Date.now() } = body;
        const itemToAdd = await workitems.insertOne({
            workitem,
            result,
            created
        });
        return c.json(itemToAdd, 201);
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