const Discord = module.require("discord.js");

module.exports.run = async (bot, Message, args) => {
    console.log("mute works!");
    if (command === `${prefix}mute`) {
        //Get the mentioned user, return if there is none.
        if (!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send("You do not have manage message premision");
        if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"));

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!toMute) return message.channel.send("You did not specify a user mention or ID!");

        if (toMute.id === message.author.id) return message.channel.send("You cannot mute yourself.");
        if (toMute.highestRole.position >= message.highestRole.position) return message.channel.send("You cannot mute a meber who is higher or has the same role as you!");

        let role = message.guild.roles.find(r => r.name === "HUSKY-BOT Muted");
        if (!role) {
            try {
                role = await message.guild.createRole({
                    name: "HUSKY-BOT Muted",
                    color: "#000000",
                    permissions: []
                }); 
                message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    if (toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");

    await toMute.addRole(role);
    message.channel.send("I have muted them.");

    return;

    //Check if command executor has the right permission to do this command.
    //If the mutee has the same or a higher role than the muter, return.
}

if (command === `${prefix}unmute`) {
    //Get the mentioned user, return if there is none.
    if (!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send("You do not have manage message premision");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send("You did not specify a user mention or ID!");

    if (toMute.id === message.author.id) return message.channel.send("You cannot unmute yourself.");
    if (toMute.highestRole.position >= message.highestRole.position) return message.channel.send("You cannot unmute a meber who is higher or has the same role as you!");

    let role = message.guild.roles.find(r => r.name === "HUSKY-BOT Muted");

    if (!role || !unmute.roles.has(role.id)) return message.channel.send("This user is not muted!");

    await toMute.removeRole(role);
    message.channel.send("I have unmuted them.");

    return;
}
}

module.exports.help = {
    name: "mute"
}
