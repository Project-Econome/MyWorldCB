const { ForgeClient } = require("@tryforge/forgescript")
const { ForgeDB } = require("@tryforge/forge.db")

const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const express = require('express');

// Client initialization
   const client = new ForgeClient({
    "intents": [
        "Guilds",
        "GuildMembers",
        "GuildModeration",
        "GuildInvites",

        "GuildMessages",
        "GuildMessageTyping",
        "DirectMessages",
        "DirectMessageTyping",
        "MessageContent",
        "AutoModerationConfiguration",
        "AutoModerationExecution",
        "GuildMessageReactions",
        "DirectMessageReactions"
    ],
    "useInviteSystem": true,
    "events": [
        "autoModerationActionExecution",
        "debug",
        "error",
        "guildBanAdd",
        "guildCreate",
        "guildBanRemove",
        "guildMemberAdd",
        "guildMemberRemove",
        "interactionCreate",
        "ready",
        "messageUpdate",
        "messageCreate",
        "messageDelete",
        "messageReactionRemoveAll",
        "inviteCreate",
        "messagePollVoteRemove",
        "messagePollVoteAdd"
    ],
    "extensions": [
        new ForgeDB({
        type: "mongodb",
url: "mongodb+srv://Fradz:EconomeMusic10@cluster0.fjivzs3.mongodb.net/bot2"
        }),
    ],
allowBots: true
})
   
   

   
// Load the commands
  
   client.applicationCommands.load("src");
   client.commands.load("interactions");

// This part puts something on the console once bot is online
client.commands.add({
    type: "ready",
    code: 
   `
    $log[- Bot $username[$botID] ID "$botID" is online!]
    $log[- Syncing CMDS]
    $updateCommands
    $updateApplicationCommands

$wait[2000]
    $log[- Bot CMDS are Synced!]
    $loop[-1;$setStatus[idle;Listening;$randomText[$username[$botID] in FS;$username[$botID] in $guildCount Servers!;The Members Adding Me!;This Is $username[$botID] V$getGlobalVar[version;3.5]]]
        $wait[10s]
        $setStatus[idle;Listening;$randomText[$username[$botID] in FS;$username[$botID] in $guildCount Servers!;The Members Adding Me!;This Is $username[$botID] V$getGlobalVar[version;3.5]]]] 

`
    
    
})


// Disable all Bugged Buttons


client.commands.add({
    type: "ready",
    code: 
   `
    $arrayLoad[buttons;,;$getGlobalVar[ButtonsMap]]

    $arrayForEach[buttons;value;
    
    $textSplit[$env[value];-]

$editButtonOf[$splitText[0];$splitText[1];$splitText[2];disabled;Catch Me!;Danger;;true]

$setGlobalVar[ButtonsMap;$replace[$getGlobalVar[ButtonsMap];$splitText[0]-$splitText[1]-$splitText[2],;]]
    
    ]

`
    
    
})


//Guild Join Modulo
client.commands.add({
    type: "guildCreate",
    code: `
    $let[c;$randomGuildChannelID[$guildID;GuildText]]
    $sendMessage[$get[c];
$author[$username[$botID];$userAvatar[$botID]]
$thumbnail[$userAvatar[$authorID]]
$title[Welcome to $username[$botID]!]
$addField[How to Use $username[$botID];
> **Hello there!** Ready to start increasing your Collections? Simply type $inlineCode[/help] to discover our easy-to-use commands!]
$addField[Join Our Support Server;
$hyperlink[Click Here!;https://discord.gg/me7APegVsw]
]
$addField[Invite $username[$botID];
$hyperlink[Click Here!;$botInvite]
]

$color[#f40066]]
`})


client.functions.add({
    name: "randomBall",
    params: [],
    code: `
$scope[
   
$arrayLoad[data;,;$readDir[./Balls;,]] 

$arrayForEach[data;checked;

$jsonLoad[json;$readFile[Balls/$env[checked]]]

$loop[$env[json;rarity];$let[Rare;$env[checked]-$get[Rare]]]

]

$arrayLoad[newdata;-;$get[Rare]]

$arrayShuffle[newdata]

$return[$arrayRandomValue[newdata]]

] 
    
`});


client.functions.add({
    name: "ballSuccess",
    params: ["user","true","ball"],
    code: `
$scope[

$if[$env[true]==true;

$return[<@$env[user]> You Caught **$env[ball]**!]

;

$return[<@$env[user]> Wrong Name!]

]


] 
    
`});





client.functions.add({
    name: "translateText",
    params: ["text","to","from"],
    code: `
$scope[
$!httpRequest[https://api.kastg.xyz/api/tool/translate?input=$replace[$env[text]; ;+]&to=$env[to]&from=$env[from];GET]


$jsonLoad[data;$replace[$replace[$httpResult[result];\\[;];\\];]]
$return[$env[data;output]]
] 
    
`});


// CountryBall Panel Thing




// Change "Your bot token" by your bot token.
require('dotenv').config();

client.login(process.env.TOKEN);

