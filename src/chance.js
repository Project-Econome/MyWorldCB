module.exports = {
    data: {
        name: "spawn",
        description: "Staff Only Spawn Balls In.",
        type: 1,
        options: [

{

type: 3,
name: "ball",
description: "Ball ID"

}

        ]
     },
    code: `
    $onlyForUsers[$ephemeral This is not for you!;$botOwnerID;838105973985771520]

$if[$getGlobalVar[EventActive]==true;
$let[directory;Events/$getGlobalVar[Event]]
;
$let[directory;Balls]
]

$onlyIf[$getGuildVar[SpawnChanEnabled]!=false;Spawning isnt enabled here]

    $if[$option[ball]==;
$arrayLoad[data;,;$readDir[./$get[directory];,]] 

$arrayForEach[data;checked;

$jsonLoad[json;$readFile[$get[directory]/$env[checked]]]

$loop[$env[json;rarity];$let[Rare;$env[checked]-$get[Rare]]]

]

$arrayLoad[newdata;-;$get[Rare]]

$arrayShuffle[newdata]

$let[newball;$arrayRandomValue[newdata]]
    ;
    
    $let[newball;$option[ball].json]
    
    ]
    
Sent

$jsonLoad[json;$readFile[$get[directory]/$get[newball]]]

$sendMessage[$getGuildVar[SpawnChan];A wild countryball has spawned!
$attachment[.$env[json;imagePath];Ball.png]

$addActionRow
$addButton[$get[newball];Catch Me!;Primary;;]
 
$setTimeout[$!editButtonOf[$channelID;$messageID;$get[newball];catch;Catch me!;Danger;;true];1000]

$setGlobalVar[ButtonsMap;$channelID-$messageID-$get[newball],$getGlobalVar[ButtonsMap]]
    ]

    `
}