import express from 'express';
import Discord, {Client, RichEmbed, TextChannel} from 'discord.js';
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
    let splitPayment = JSON.parse(req.body.split_payment);
    let discord_server = discord.guilds.get(splitPayment.split_group_id_discord_server);

    let embed:RichEmbed = new RichEmbed();

    embed.setTitle(splitPayment.description);
    embed.setURL("https://scipio.mytcc.be");
    embed.setAuthor(splitPayment.user_login);
    embed.setDescription(`A new payment has been created by **${splitPayment.user_login}** in the group **${splitPayment.split_group_name}** for a total of **${splitPayment.total}€**.\nCheck out the details of the money due to him/her for this payment :`);
    for(let user in splitPayment.participating_users){
        embed.addField(splitPayment.participating_users[user].login, `${splitPayment.participating_users[user].amount}€`)
    }


    if (discord_server != undefined) {
        (<TextChannel>discord_server.channels.get(splitPayment.split_group_id_discord_default_channel)).send(embed);
    } else {
        logger.error("Guild ID Not existant");
    }
});

new CommunistSplitRoutes().setupRoute(server);
