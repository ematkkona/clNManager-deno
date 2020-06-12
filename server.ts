//SPDX-License-Identifier: MIT
//clN22 workitem manager v0.02
//(c)2020 EM~ eetu@kkona.xyz
export const VERSION:string = '0.02';
import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import "https://deno.land/x/dotenv/mod.ts";
export const env = Deno.env.toObject();
const PORT:number = parseInt(env.PORT) || 8022;
import { workRequest, workAssign, workUpdItem, wPostNew, removeItem } from './controllers/workitem.ts';
import { getUserData, updateUserData } from './controllers/userdata.ts';
import { rootMsg, getStats } from './controllers/globaldata.ts';
const app = new Application();
app 
    .get('/', rootMsg)
    .get('/stats', getStats)
    .get('/userdata/:uid', getUserData)
    .get('/workitem/wreq', workRequest)
    .get('/workitem/wreq/:id', workAssign)
    .put('/workitem/wres/:id', workUpdItem)
    .post('/workitem/:id', wPostNew)
    .delete('/workitem/:id', removeItem)
    .start({ port:PORT });
console.log(`clN22-workitem manager v${VERSION} (deno). Listening on port: ${PORT}.`);