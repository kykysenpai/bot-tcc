import express from 'express';
import Discord, {Client, TextChannel} from 'discord.js';
import CommunistSplitRoutes from "./routes/communist_split/communist_split_routes";
import logger from "./logger/logger";
import BasicCommands from "./discord/basic_commands/basic_commands_router";

/**
 * ---------------------------------------- DISCORD BOT ---------------------------------------
 */

const discord: Client = new Discord.Client();

discord.on('ready', () => {
    logger.info("Discord bot has started");
});

new BasicCommands(discord).setup();

discord.login('NTU1ODEwODcyMjgzNjI3NTMy.D2wmyA.dhDR0r5Wx_SzCfx_j7MPjIXHFRo')
    .then((status) => {
        logger.info("Discord bot is logged in");
    })
    .catch((err) => {
        logger.error("Discord bot error while logging in :", err);
    });

/**
 *  -------------------------------------- EXPRESS ROUTES ----------------------------------
 */

const server = express();

server.use(express.json());

server.listen(8080, () => {
    logger.info("Express HTTP server is listening on port 8080");
});

server.post('/api/payment', (req, res) => {
    console.log(req.body);
    let splitPayment = JSON.parse(req.body.split_payment);
    console.log(splitPayment);
    console.log(splitPayment.split_group_id_discord_server);
    let tcc = discord.guilds.get(splitPayment.split_group_id_discord_server);
    if (tcc != undefined) {
        (<TextChannel>tcc.channels.get("555886032680386581")).send(JSON.stringify(req.body));
    } else {
        logger.error("Guild ID Not existant");
    }
});

new CommunistSplitRoutes().setupRoute(server);
