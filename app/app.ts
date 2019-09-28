import express from 'express';
import Discord, {Client} from 'discord.js';
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

// new BasicCommands(discord).setup();

discord.login('NTU1ODEwODcyMjgzNjI3NTMy.XY9fgg.ml_XI0hI7Plb3GLYz1h94sP6oUo')
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

new CommunistSplitRoutes(server, discord).setupRoute();
