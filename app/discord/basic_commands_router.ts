import DiscordRouter from "./discord_router";
import {Client, RichEmbed} from "discord.js";
import basicCommands from "./basic_commands";

export default class BasicCommands implements DiscordRouter {

    discord: Client;

    constructor(discord:Client){
        this.discord = discord;
    }

    setup(): void {
        for (let command in basicCommands) {
            this.discord.on('message', message => {
                if (message.content.toLowerCase().match(command.toLowerCase()) && !message.author.bot) {
                    message.channel.send(basicCommands[command]);
                }
            })
        }
    }

}
