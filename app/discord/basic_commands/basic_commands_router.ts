import DiscordRouter from "../discord_router";
import {Client, GuildMember} from "discord.js";
import basicCommands from "./basic_commands";

export default class BasicCommands implements DiscordRouter {

    constructor(private discord: Client) {
    }

    setup(): void {
        for (let command in basicCommands) {
            this.discord.on('message', message => {
                if (message.content.toLowerCase() === command.toLowerCase() && !message.author.bot && message.author.id !== "226364886110699521") {
                    message.channel.send(basicCommands[command]);
                } else if (message.content.toLowerCase() === command.toLowerCase() && message.author.id === "226364886110699521") {
                    message.channel.send("TG <@226364886110699521>");
                }

                if (message.author.id === "226364886110699521") {
                    let slin = message.guild.members.get("226364886110699521");
                    if (slin !== undefined) {
                        (<GuildMember>slin).setNickname("TCC Slinpy");
                    }
                }
            })
        }
    }

}
