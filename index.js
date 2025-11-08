import { Client, GatewayIntentBits, Partials } from "discord.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.get("/", (req, res) => res.send("Bot is running"));
app.listen(3000, () => console.log("✅ Web server started"));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

client.on("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  // Replace this with your Discord user ID
  const userId = process.env.USER_ID;

  // Function to send periodic messages
  const sendHeartbeat = async () => {
    try {
      const user = await client.users.fetch(userId);
      const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      await user.send(`🕒 Bot heartbeat: still alive at **${now}**`);
      console.log(`✅ Sent timestamp DM at ${now}`);
    } catch (err) {
      console.error("❌ Could not send heartbeat DM:", err.message);
    }
  };

  // Send immediately once, then every 5 minutes
  await sendHeartbeat();
  setInterval(sendHeartbeat, 5 * 60 * 1000);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes("hello")) {
    await message.reply("Hey 👋, I'm here — even in DMs!");
  }
});

client.login(process.env.DISCORD_TOKEN);
