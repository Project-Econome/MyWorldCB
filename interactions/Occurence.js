module.exports = {
    name: "",
    type: "messageCreate",
    code: `
    $if[$or[$authorID==$botID;$isBot==true];;
$if[$or[$getGuildVar[SpawnChan]==;$guildChannelExists[$guildID;$getGuildVar[SpawnChan]]==false];;
    
$if[$getGuildCooldownTime[timer]==0;

$arrayLoad[data;,;$readDir[./Balls;,]] 


$arrayForEach[data;checked;

$jsonLoad[json;$readFile[Balls/$env[checked]]]

$loop[$env[json;rarity];$let[Rare;$env[checked]-$get[Rare]]]

]

$arrayLoad[newdata;-;$get[Rare]]

$arrayShuffle[newdata]

$let[newball;$arrayRandomValue[newdata]]

    

$jsonLoad[json;$readFile[Balls/$get[newball]]]

$sendMessage[$channelID;Spawn Test

$attachment[.$env[json;imagePath];Ball.png]

$addActionRow
$addButton[$get[newball];Catch Me!;Primary;;]
 
$setTimeout[$!editButtonOf[$channelID;$messageID;$get[newball];catch;Catch me!;Danger;;true];1000]

$setGlobalVar[ButtonsMap;$channelID-$messageID-$get[newball],$getGlobalVar[ButtonsMap]]
    ]
]

$if[$get[guildActive]==true;
$guildCooldown[timer;15m];
$guildCooldown[timer;35m]
]

]
]
    `
}