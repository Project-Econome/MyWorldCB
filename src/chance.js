module.exports = {
    data: {
        name: "chance-list",
        description: "chance lists",
        type: 1,
     },
    code: `
$arrayLoad[data;,;$readDir[./Balls;,]] 

$arrayForEach[data;checked;

$jsonLoad[json;$readFile[Balls/$env[checked]]]

$loop[$env[json;rarity];$let[Rare;$env[checked]-$get[Rare]]]

]

$arrayLoad[newdata;-;$get[Rare]]

$arrayShuffle[newdata]

$let[newball;$arrayRandomValue[newdata]]

    
Sent

$jsonLoad[json;$readFile[Balls/$get[newball]]]

$sendMessage[$channelID;Spawn Test

Name: $env[json;country]

Catch Names: $env[json;catchNames]

Rarity Factor: $env[json;rarity]

$attachment[.$env[json;imagePath];Ball.png]

$addActionRow
$addButton[$get[newball];Catch Me!;Primary;;]
 
$setTimeout[$!editButtonOf[$channelID;$messageID;$get[newball];catch;Catch me!;Danger;;true];1000]

$setGlobalVar[ButtonsMap;$channelID-$messageID-$get[newball],$getGlobalVar[ButtonsMap]]
    ]

    `
}