const Discord = module.require("discord.js");

module.exports.run = async (bot, Message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("this is the user's info!")
        .setColor("#9B59B6")
        .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("created At", message.author.createdAt);

    message.channel.send({ embed: embed });
}

module.exports.help = {
    name: "userinfo"
}


    //return;
    //}