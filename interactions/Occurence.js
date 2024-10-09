module.exports = {
    name: "",
    type: "messageCreate",
    code: `

$if[$getGlobalVar[EventActive]==true;
$let[directory;Events/$getGlobalVar[Event]]
;
$let[directory;Balls]
]

    $if[$or[$authorID==$botID;$isBot==true];;
    $onlyIf[$getGuildVar[SpawnChanEnabled]!=false]
$if[$or[$getGuildVar[SpawnChan]==;$guildChannelExists[$guildID;$getGuildVar[SpawnChan]]==false];;
    
$if[$getGuildCooldownTime[timer]==0;

$arrayLoad[data;,;$readDir[./$get[directory];,]] 


$arrayForEach[data;checked;

$jsonLoad[json;$readFile[$get[directory]/$env[checked]]]

$loop[$env[json;rarity];$let[Rare;$env[checked]-$get[Rare]]]

]

$arrayLoad[newdata;-;$get[Rare]]

$arrayShuffle[newdata]

$let[newball;$arrayRandomValue[newdata]]

    

$jsonLoad[json;$readFile[$get[directory]/$get[newball]]]

$sendMessage[$getGuildVar[SpawnChan];A wild countryball has spawned!

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