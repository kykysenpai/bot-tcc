import {Client} from "discord.js";

export default interface DiscordRouter {
    discord:Client;
    setup(discord:Client):void;
}
