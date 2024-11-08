module.exports = {
    type: "messageCreate",
    code: `
$guildCooldown[$guildID;$if[$get[guildActive]==true;15m;35m]]
$if[$getGlobalVar[EventActive]==true;
$let[directory;Events/$getGlobalVar[Event]]
;
$let[directory;Balls]
]
$onlyIf[$isBot[$authorID]!=true]
    $if[$or[$authorID==$botID;$isBot==true];;
    $onlyIf[$getGuildVar[SpawnChanEnabled]!=false]
$if[$or[$getGuildVar[SpawnChan]==;$guildChannelExists[$guildID;$getGuildVar[SpawnChan]]==false];;
    
$if[$getGuildCooldownTime[timer]==0;
$setGuildVar[delay;false]
$arrayLoad[data;,;$readDir[$get[directory];,]] 


$arrayForEach[data;checked;

$jsonLoad[json;$readFile[$get[directory]/$env[checked]]]

$loop[$env[json;rarity];$let[Rare;$env[checked]-$get[Rare]]]

]

$arrayLoad[newdata;-;$get[Rare]]

$arrayShuffle[newdata]

$let[newball;$arrayRandomValue[newdata]]

    $jsonLoad[config;$readFile[./config.json]] $let[name;$env[config;Name]]

$jsonLoad[json;$readFile[$get[directory]/$get[newball]]]

$let[id;$sendMessage[$getGuildVar[SpawnChan];A wild $get[name] has spawned!

$attachment[.$env[json;imagePath];Ball.png]

$addActionRow
$addButton[$get[newball];Catch me!;Primary;;]
 


    ;true]]
$setGlobalVar[ButtonsMap;$channelID-$get[id]-$get[newball],$getGlobalVar[ButtonsMap]]
    $setTimeout[$!editButtonOf[$channelID;$get[id];$get[newball];catch;Catch me!;Danger;;true];1m]
]

$if[$get[guildActive]==true;
$guildCooldown[timer;15m];
$guildCooldown[timer;35m]
]

]
]
    `
}