const botSettings = require("./bootsetings.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({ disableEveryone: true });
bot.command = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if (err) console.error(err)


    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("no commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`)
        bot.command.set(f, props);
    });

});

const prefix = botSettings.prefix;

bot.on("ready", async () => {
    console.log(`bot is ready! ${bot.user.username}`);
    console.log(bot.commands);


});

bot.on("message", async message => {
    if (message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);
    // if(command === `${prefix}userinfo`) {
    // let embed = new Discord.RichEmbed()
    //   .setAuthor(message.author.username)
    // .setDescription("this is the user's info!")
    //    .setColor("#9B59B6")
    //    .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
    //    .addField("ID", message.author.id)
    //    .addField("created At", message.author.createdAt);

    //message.channel.send({ embed: embed });

    //return;
    //}

    //if (command === `${prefix}mute`) {
    //    //Get the mentioned user, return if there is none.
    //    if (!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send("You do not have manage message premision");
    //    if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"));

    //    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    //    if (!toMute) return message.channel.send("You did not specify a user mention or ID!");

    //        if (toMute.id === message.author.id) return message.channel.send("You cannot mute yourself.");
    //      if (toMute.highestRole.position >= message.highestRole.position) return message.channel.send("You cannot mute a meber who is higher or has the same role as you!");

    //    let role = message.guild.roles.find(r => r.name === "HUSKY-BOT Muted");
    //  if (!role) {
    //    try {
    //      role = await message.guild.createRole({
    //        name: "HUSKY-BOT Muted",
    //      color: "#000000",
    //    permissions: []
    //});

    //message.guild.channels.forEach(async (channel, id) => {
    //  await channel.overwritePermissions(role, {
    //    SEND_MESSAGES: false,
    //  ADD_REACTIONS: false
    // });
    // });
    //} catch (e) {
    //    console.log(e.stack);
    //    }
    //}

    //if (toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");

    //await toMute.addRole(role);
    //message.channel.send("I have muted them.");

    //return;

    //Check if command executor has the right permission to do this command.
    //If the mutee has the same or a higher role than the muter, return.
    //}

    //if (command === `${prefix}unmute`) {
    //Get the mentioned user, return if there is none.
    //if (!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send("You do not have manage message premision");

    //let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    //if (!toMute) return message.channel.send("You did not specify a user mention or ID!");

    //if (toMute.id === message.author.id) return message.channel.send("You cannot unmute yourself.");
    //if (toMute.highestRole.position >= message.highestRole.position) return message.channel.send("You cannot unmute a meber who is higher or has the same role as you!");

    //let role = message.guild.roles.find(r => r.name === "HUSKY-BOT Muted");

    //if (!role || !unmute.roles.has(role.id)) return message.channel.send("This user is not muted!");

    //await toMute.removeRole(role);
    //message.channel.send("I have unmuted them.");

    //return;
    //}

});

bot.login(botSettings.token);