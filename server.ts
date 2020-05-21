//SPDX-License-Identifier: MIT
//clN22 workitem manager v0.01
//(c)2020 EM~ eetu@kkona.xyz
export const VERSION:string = '0.01';
import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
export const env = Deno.env.toObject();
const PORT:number = parseInt(env.PORT) || 8022;
import { rootMsg, getStats, workRequest, workGetSingle, workUpdItem, wPostNew, removeItem } from './controllers/workitem.ts';
const app = new Application();
app 
    .get('/', rootMsg)
    .get('/stats', getStats)
    .get('/workitem/wreq', workRequest)
    .get('/workitem/get/:id', workGetSingle)
    .put('/workitem/upd/:id', workUpdItem)
    .post('/workitem/new/:id', wPostNew)
    .delete('/workitem/del/:id', removeItem)
    .start({ port:PORT });
console.log(`clN22-workitem manager v${VERSION} (deno). Listening on port: ${PORT}.`);