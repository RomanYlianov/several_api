const Discord = require('discord.js');
const { Client } = require("discord.js");
const { Intents } = require('discord.js');
const robots = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
let { prefix, token } = require('./config.json');



const quenue = new Map();
robots.on("ready", () => {
    console.log('bot started');
});



//event call after each sending message
robots.on('message', async message => {
    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(prefix)) {
        return;
    }
    else {
        //get message string
        let cmdline = message.content.slice(prefix.length, message.content.length);
        let sfw_args = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'];
        let nsfw_args = ['waifu', 'neko', 'trap', 'blowjob'];
        //get_image("sfw", "waifu");
       // var embed = showembed('sfw', 'waifu', 'https://i.waifu.pics/uc-SymC.jpg');
        //message.channel.send(embed);
        //get command
        let cmd = cmdline.slice(1, cmdline.length);
        console.log("=============");
        console.log(cmd);
        if (cmd.startsWith("show")) {
            if (cmd.split(' ').length == 3) {
                let category = cmd.split(' ')[1];
                let value = cmd.split(' ')[2];
                console.log("category "+category+", value "+value);
                if (category == "sfw") {
                    if (sfw_args.includes(value)) {
                         exex_resp(category, value);
                     
                    }

                }
                else
                if (category == "nsfw") {
                    if (nsfw_args.includes(value)) {
                        exex_resp(category, value);                    }
                }
                else {
                    message.channel.send('unknown argument, please try again');
                }

            }
        }
        else
        if (cmd.startsWith("help")) {
            let iconurl = "https://www.logotypes101.com/logos/911/7DB31115F0BBCC09136A2341E99C0FBE/AnimeLogo.png";
            let embed = new MessageEmbed();
            embed.setColor('DARKER_GREY');
            
            embed.setTitle('list of commands');
           
            embed.addFields({name: 'sfw', value: sfw_args.join()}, {name: 'nsfw', value: nsfw_args.join()})
            // embed.addFields({ name: "password", value: pass, inline: true }, { name: "team size", value: sizeInfo, inline: true }, { name: "current size", value: usersCount, inline: true }, { name: "players", value: usersInfoString, inline: false })
            embed.setTimestamp();
            embed.setFooter(text = "anime image bot", iconURL = iconurl);
            message.channel.send(embed);
        }
        else {
            message.channel.send("unknown command, please try again");
        }

    }
      
   


   /* if (cmd == "hello") {
        //get sender username
        var username = message.author.username;
        //send message on channel
        message.channel.send("hi, " + username + "!");
    }
    else {
        message.channel.send("unknown command");
    }*/


    async function exex_resp(category, value) {
        let url = "https://api.waifu.pics/" + category + "/" + value;
        console.log(url);
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            let result = json['url'];
            message.channel.send(result);
            //let iconurl = "https://www.logotypes101.com/logos/911/7DB31115F0BBCC09136A2341E99C0FBE/AnimeLogo.png";
            /*let embed = new MessageEmbed();
            embed.setColor('DARKER_GREY');
            let tittle = category + "/" + value;
            embed.setTitle(tittle);
            //embed.setDescription(teamDescription);
            //let imgs = (JSON.parse(fs.readFileSync('./resources.json'))['images']);
            embed.setThumbnail(result);
            // embed.addFields({ name: "password", value: pass, inline: true }, { name: "team size", value: sizeInfo, inline: true }, { name: "current size", value: usersCount, inline: true }, { name: "players", value: usersInfoString, inline: false })
            embed.setTimestamp();
            embed.setFooter(text = "anime image bot", iconURL = iconurl);
    
          
            message.channel.send(embed);*/
        }
        else {
            console.log('request api failed');
        }
    }



});







robots.login(token);