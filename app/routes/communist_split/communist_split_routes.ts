import {Express} from "express";
import RouteComponent from "../route_component";
import {Client, RichEmbed, TextChannel} from "discord.js";
import logger from "../../logger/logger";

export default class CommunistSplitRoutes implements RouteComponent {

    constructor(private server: Express, private discord: Client) {
    }

    setupRoute() {

        /**
         * Create a new payment based on infos sent by Scipio
         */
        this.server.post('/api/payment', (req, res) => {
            let splitPayment = JSON.parse(req.body.split_payment);
            let discord_server = this.discord.guilds.get(splitPayment.split_group_id_discord_server);

            let embed: RichEmbed = new RichEmbed();

            embed.setTitle(splitPayment.description);
            embed.setURL("https://scipio.mytcc.be");
            embed.setAuthor(splitPayment.user_login);
            embed.setDescription(`A new payment has been created by **${splitPayment.user_login}** in the group **${splitPayment.split_group_name}** for a total of **${splitPayment.total}€**.\nCheck out the details of the money due to him/her for : **${splitPayment.description}**`);
            for (let user in splitPayment.participating_users) {
                embed.addField(splitPayment.participating_users[user].login, `${splitPayment.participating_users[user].amount}€`)
            }


            if (discord_server != undefined) {
                (<TextChannel>discord_server.channels.get(splitPayment.split_group_id_discord_default_channel)).send(embed);
            } else {
                logger.error("Guild ID Not existant");
            }
        });

    }
}
