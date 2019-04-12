import DiscordRouter from "../discord_router";
import {Client} from "discord.js";
import basicCommands from "./basic_commands";

export default class BasicCommands implements DiscordRouter {

    discord: Client;

    constructor(discord: Client) {
        this.discord = discord;
    }

    setup(): void {
        for (let command in basicCommands) {
            this.discord.on('message', message => {
                if (message.content.toLowerCase() === command.toLowerCase() && !message.author.bot && message.author.id !== "226364886110699521") {
                    message.channel.send(basicCommands[command]);
                } else if (message.content.toLowerCase() === command.toLowerCase() && message.author.id === "226364886110699521"){
                    message.channel.send("TG <@226364886110699521>");
                }
            })
        }
    }

}
