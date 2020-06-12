//SPDX-License-Identifier: MIT
//(c)2020 EM~ eetu@kkona.xyz

import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { env, VERSION } from "../server.ts";
import db from "../config/db.ts";
import { Iworkitem, Ivalidate } from '../config/interface.ts';
const database = db.getDatabase;
const workitems = database.collection("workitems");
const ident = database.collection("ident");
const validateData: Ivalidate = JSON.parse(Deno.readTextFileSync('./config/validate.json'));
const benchmarkData: Ivalidate = JSON.parse(Deno.readTextFileSync('./config/benchmark.json'));
export { wPostNew, workRequest, workAssign, workUpdItem, removeItem };

const workRequest: HandlerFunc = async (c: Context) => {
    try {
        const body = await (c.body());
        if (!Object.keys(body).length) {
            return c.string("workRequest: Empty!", 400);
        }
        const { uid } = c.params as { uid: string };
        const { id } = c.params as { id: string };
        const fetchItem = await fetchWorkItem(uid, id);
        return c.json(fetchItem,200);
    } catch (error) {
        return c.json(error,500);
    }
}
const workAssign: HandlerFunc = async (c: Context) => {
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
        if (fetchItem != "waiting" || fetchItem != "working") {
            workitems.deleteOne({_id: { "$oid":id } });
            return c.json('removeItem: Done',200);
        } else {
            return c.json('removeItem: Nope',400);
        }
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

function fetchWorkItem(uid: string, id: string) {
    //todo
        if (checkOwnerShip(uid, id)) {
            return `Here you go...`;
        } else {
            return `No deal...`;
    }
}
    
function checkOwnerShip(uid: string, id: string) {
    //todo
    if (uid && id) {
        return true;
    } else {
        return false;
    }
}