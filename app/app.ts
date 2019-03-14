import express from 'express';
import Discord, {Client} from 'discord.js';
import CommunistSplitRoutes from "./routes/communist_split/communist_split_routes";

/**
 *  -------------------------------------- EXPRESS ROUTES ----------------------------------
 */

const server = express();

server.listen(8080, () => {
    console.info("Express HTTP server is listening on port 8080");
});

new CommunistSplitRoutes().setupRoute(server);


/**
 * ---------------------------------------- DISCORD BOT ---------------------------------------
 */

const discord: Client = new Discord.Client();

discord.on('ready', () => {
   console.info("Discord bot has started");
});

discord.login('NTU1ODEwODcyMjgzNjI3NTMy.D2wmyA.dhDR0r5Wx_SzCfx_j7MPjIXHFRo')
    .then((status) => {
        console.info("Discord bot is logged in");
    }).catch((err) => {
        console.error("Discord bot error while logging in :", err);
});
