module.exports = {
    data: {
        name: "spawn",
        description: "Developer Only Spawn Balls In.",
        type: 1,
        options: [

{

type: 3,
name: "spawn",
description: "Ball ID",
required: true,
autocomplete: true
}

        ]
     },
    code: `
    $onlyForUsers[$ephemeral This is not for you!;$botOwnerID;838105973985771520;1124764961990787082]

$if[$getGlobalVar[EventActive]==true;
$let[directory;Events/$getGlobalVar[Event]]
;
$let[directory;Balls]
]

$onlyIf[$getGuildVar[SpawnChanEnabled]!=false;Spawning isnt enabled here]

$setGuildVar[delay;false]

    $if[$option[spawn]==;
$arrayLoad[data;,;$readDir[./$get[directory];,]] 

$arrayForEach[data;checked;

$jsonLoad[json;$readFile[$get[directory]/$env[checked]]]

$loop[$env[json;rarity];$let[Rare;$env[checked]-$get[Rare]]]

]

$arrayLoad[newdata;-;$get[Rare]]

$arrayShuffle[newdata]

$let[newball;$arrayRandomValue[newdata]]
    ;
    
    $let[newball;$option[spawn]]
    
    ]
    

$ephemeral
Sent

$jsonLoad[json;$readFile[$get[directory]/$get[newball]]]

$jsonLoad[config;$readFile[./config.json]] $let[name;$env[config;Name]]

$let[id;$sendMessage[$getGuildVar[SpawnChan];A wild $get[name] has spawned!
$attachment[.$env[json;imagePath];Ball.png]

$addActionRow
$addButton[$get[newball];Catch Me!;Primary;;]
 

    ;true]]

$setTimeout[$!editButtonOf[$channelID;$get[id];$get[newball];catch;Catch me!;Danger;;true];1m]

$setGlobalVar[ButtonsMap;$channelID-$get[id]-$get[newball],$getGlobalVar[ButtonsMap]]

$jsonLoad[config;$readFile[./config.json]] $let[logs;$env[config;Log]]

$sendMessage[$get[logs];
A ball has been Spawned!
$title[Details:]
$description[Author: $username
User ID: $authorID
Guild ID: $guildID]


]
    `
}