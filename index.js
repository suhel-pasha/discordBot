import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.author.bot) return

  if (msg.content == "Hi") {
    msg.reply(`Hello`);
  }

  if (msg.content == "kill") {
    process.exit();
  }

});
const token = process.env.DISCORD_TOKEN;
client.login(token);
