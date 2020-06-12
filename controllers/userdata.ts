//SPDX-License-Identifier: MIT
//(c)2020 EM~ eetu@kkona.xyz

import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { env, VERSION } from "../server.ts";
import db from "../config/db.ts";
import { Iworkitem, Ivalidate } from '../config/interface.ts';
const database = db.getDatabase;
const ident = database.collection("ident");
export { getUserData, updateUserData };

const getUserData: HandlerFunc = async (c: Context) => {
    try {
        const response = `getUserData: Funny. This is not yet implemented ...`;
        return c.json(response, 200);
    } catch (error) {
        return c.json(error, 500);
    }
}

const updateUserData: HandlerFunc = async (c: Context) => {
    try {
        const response = `updateUserData: Funny. This is not yet implemented ...`;
        return c.json(response, 200);
    } catch (error) {
        return c.json(error, 500);
    }
}